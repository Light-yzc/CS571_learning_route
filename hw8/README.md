
# CS571-S25 HW8: Badger News

Welcome to Badger News! For this assignment, you will complete a mobile application that allows badgers to get and customize news from their university using just a few taps on their phone!

## Badger News

The starter code provided to you was generated using [expo](https://expo.dev/) and all the necessary libraries for [react navigation](https://reactnavigation.org/) have already been added. See the `package.json` for details. **You should *not* re-run the expo init command**. Instead, in this directory, simply run...

```bash
npm install
npm start
```

To test your app, you have a few options. If you have a smart device, I would recommend using the expo app for [iOS](https://apps.apple.com/us/app/expo-go/id982107779) or [Android](https://play.google.com/store/apps/details?id=host.exp.exponent&hl=en_US&gl=US). You can scan the QR code using your phone, or you can launch commands via the terminal. Otherwise, you can use an emulator (such as [AVD](https://developer.android.com/studio/run/emulator)). Do not use the web browser to test your code; you must test on Android or iOS!

Note that we are writing code in JavaScript for React Native; if you begin writing code in Objective-C, Swift, Java, or Kotlin you are likely doing something *very* wrong!

### API Notes

Please use Postman to explore the API in greater depth.

`https://cs571api.cs.wisc.edu/rest/s25/hw8/articles` returns a short summary of each of the news articles including an `id`, `img`, `title`, `tags`, and `fullArticleId`. You may assume the `id` is unique for each article. The `fullArticleId` is also unique and can be used to fetch additional details below.

`https://cs571api.cs.wisc.edu/rest/s25/hw8/article?id=ARTICLE_ID` returns the details for a particular article id (from the `fullArticleId` above). **This endpoint is intentionally slow.** These details include all of the properties of the short summary as well as additional `body`, `author`, `posted`, and `url` properties. In particular...

 - `body` is a `list` of `string` where each item is a paragraph
 - `author` is a `string` of the author of the article
 - `posted` is a `string` representing the date the article was posted
 - `url` is `string` linking to the real article on [news.wisc.edu](https://news.wisc.edu/)

 The `img` may be appended to `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/` to get the requested image, e.g. the image `climate.jpg` is hosted at `https://raw.githubusercontent.com/CS571-S25/hw8-api-static-content/main/climate.jpg`

 Please note that, while the news articles on [news.wisc.edu](https://news.wisc.edu/) have pictures embedded within the article, our API does not have these. Therefore, there may be some text that feels "out of place".

## Important

 - The screenshots and demo video below are just an example; the exact articles will change from semester to semester.
 - Each article has an `id` and `fullArticleId`. The `fullArticleId` should be used to retrieve the details about a specific article.

### 1. Use React Navigation

Allow the user to navigate between two tabs: a tab for "News" and a tab for "Preferences". I would recommend using a BottomTabNavigator in `BadgerTabs.jsx` to navigate between screens for `BadgerNewsScreen.jsx` and `BadgerPreferencesScreen.jsx`. You may provide icons for and/or style the tabs, but it is not a requirement. **However, you must use React Navigation.**

![](_figures/Step1.png)

### 2. Display News

Fetch the short news article summaries from `https://cs571api.cs.wisc.edu/rest/s25/hw8/articles` and display them to the screen as a card, including their image and title text. I'd recommend creating a component such as `BadgerNewsItemCard` to display each short summary as a card. Use the article's `id` as the unique key.

You may find the `BadgerCard` from lecture helpful here, or you may install and use `Card` from `react-native-paper`. If you use `react-native-paper`, please be sure that it is listed as a dependency in your `package.json`.

![](_figures/Step2.png)

### 3. Read News Article

When a news story is selected, the user should be able brought to another screen using a *nested Stack Navigator*. This screen should show the author, posting date, and body paragraphs fetched from `https://cs571api.cs.wisc.edu/rest/s25/hw8/article?id=ARTICLE_ID`. Be sure that only the "Article" header bar is shown. We will add the URL in Step 5.

Additionally, the user should be displayed a message along the lines of "The content is loading!" while waiting for the body paragraphs to load. Furthermore, loading the additional content of the article must be *animated*. It may fade in, grow in size, or do some animation using `Animated` or some other third-party library. After finishing reading the article, the user should be able to to return to the list of short summaries. If they re-visit the story, the animation should occur again.

**Hint:** In `BadgerTabs.jsx`, where you likely route to `BadgerNewsScreen`, consider routing to a new, nested navigator such as `BadgerNewsStack` *which contains* `BadgerNewsScreen` instead!

![](_figures/Step3.png)

### 4. Apply Preferences

The user should be able to apply their news preferences via the "Preferences" tab. This tab should display [switches](https://reactnative.dev/docs/switch) (**on:** opt in, **off:** opt out) for each of the unique tags. You may **NOT** hardcode the list of unique tags; instead, you must iterate over all of the tags of the story summaries to create this list.

By default, the user should opt in to all content. However, the user should be able to toggle their preferences on and off. If the user has a preference toggled off, *any* news story with that tag should *not* be displayed to the user. If the user's preferences are so restrictive that there are no articles to be displayed, a message should be displayed saying so (it is also okay for this message to be displayed while the short summaries are loading).

I would recommend creating and using a context to store the users preferences.

**Note:** While we didn't cover [switches](https://reactnative.dev/docs/switch) in class, it's expected for you to read, use, and apply this documentation to your code. You may *control* a switch like we do an input component. 

![](_figures/Step4.png)

### 5. Add URL

Finally, re-visit Step 3 and add some text that says "Read full article here." linking to the URL of the article on [news.wisc.edu](https://news.wisc.edu/). You will likely complete this using some `Pressable` text that uses [Linking](https://reactnative.dev/docs/linking#example) to open the article in the users' browser.

**Note:** While we didn't cover this library in class, it's expected for you to read, use, and apply this documentation to your code. You may assume that the URL is properly formatted and supported by the users' browser.

![](_figures/Step5.png)

### Other Notes

You may *not* hardcode the number of articles *or* the names of preferences *anywhere*! Being a busy publishing firm in Madison, these may vary from day-to-day, and we should *not* assume that they remain the same.

### Submission Details
In addition to your code, **you will also need to submit a video recording of your app**. Like the demo video, it should cover all the tasks below. Please thoroughly demonstrate all tasks to showcase the capabilities of your app.

**Please embed your recording as a *Kaltura video* as a part of the assignment submission.**

#### Tasks 
 - Show the short summaries of all news stories.
 - Read 2 specific news stories and navigate back to the main news screen.
   - Open the full article for 1 of the news stories.
 - Update the preferences to exclude 2 preferences and show that the news items have changed accordingly.
 - Update the preferences to exclude all preferences to show the warning message.

### Done! 🥳
Congrats! Add, commit, and push your files to GitHub Classroom. Then, paste your commit hash and embed your recording in the Canvas assignment.

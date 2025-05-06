
import { useState } from "react";
import { Button } from "bootstrap";
import { Card, Table } from "react-bootstrap";
export default function FeaturedItem(props) {
  const [isShown, setIsShown] = useState(false); // 控制显示与隐藏

  const toggleShown = () => {
    setIsShown(!isShown);
  };

  // 从 props.nutrition 中提取营养信息，若缺失则为 "0g"
  const nutrition = props.nutrition || {};
  const calories = nutrition.calories || "0g";
  const fat = nutrition.fat || "0g";
  const carbs = nutrition.carbohydrates || "0g";
  const protein = nutrition.protein || "0g";

  return (
    <Card>
      <img src={props.img} alt={props.description} height="400" width="400" style={{ display: "block", margin: "0 auto" }} />
      <h3>{props.name}</h3>
      <h4>$ {props.price} per unit</h4>
      <h6>{props.description}</h6>
      {!isShown ? '' : (
        <Card>
        <Table border="1" style={{ marginTop: "10px" }}>
          <thead>
            <tr>
              <th>Calories</th>
              <th>Fat</th>
              <th>Carbohydrates</th>
              <th>Protein</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{calories}</td>
              <td>{fat}</td>
              <td>{carbs}</td>
              <td>{protein}</td>
            </tr>
          </tbody>
        </Table>
        </Card>
      )}
    <button onClick={toggleShown}>
    {isShown ? "Hide Nutrition Facts" : "Show Nutrition Facts"}
      </button>
    </Card>
  );
  
}
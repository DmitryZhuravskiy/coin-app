import React from "react";
import { Table } from "react-bootstrap";

const CoinsTable = ({ data }) => {
  return (
    <Table stripped="true" bordered hover>
      <thead>
        <tr>
          <th>№</th>
          <th>Название</th>
          <th>Цена</th>
        </tr>
      </thead>
      <tbody>
        {data.map((obj) => (
          <tr>
            <td>{obj.rank}</td>
            <td>
              <img
                src={obj.icon}
                alt="Coin"
                width={20}
                style={{ marginRight: 10 }}
              />
              {obj.name}
            </td>
            <td>$ {obj.price}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default CoinsTable;

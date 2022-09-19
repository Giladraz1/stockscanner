import React from "react";
import Table from "react-bootstrap/Table";

export default function TableTop() {
  return (
    <>
      <Table className="mb-0">
        <thead>
          <tr className="row d-flex p-1 m-0">
            <th className="col-4 text-muted fw-normal small">Symbol</th>

            <th className="col-8 d-flex">
              <div className="text-nowrap col-4 text-muted fw-normal small">
                Last Price
              </div>
              <div className="col-4 text-muted fw-normal small">Change</div>
              <div className="text-nowrap col-4 text-muted fw-normal small">
                % Change
              </div>
            </th>
          </tr>
        </thead>
      </Table>
    </>
  );
}

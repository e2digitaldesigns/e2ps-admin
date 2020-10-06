import React from "react";
import Form from "react-bootstrap/Form";
import OptionLink from "./option-link";

export default ({
  orderId,
  menuState,
  menuToggle,
  invoiceInformation,
  assets,
  editOrderSegments,
}) => {
  return (
    <>
      <li>
        <Form.Check
          id={`${orderId}_allowDownloads`}
          name={"allowDownloads"}
          type="switch"
          label={"Allow Downloads"}
          checked={invoiceInformation.allowDownloads}
          onChange={(e) => editOrderSegments(e)}
        />
      </li>

      <li>
        <Form.Check
          id={`${orderId}_designManager`}
          name={"designManager"}
          type="switch"
          label={"Design Manager"}
          checked={invoiceInformation.designManager}
          onChange={(e) => editOrderSegments(e)}
        />
      </li>

      <li>
        <span className="invoice-label">Designer:</span> n/a <br />
        <span className="invoice-label">Sent to Design Date:</span> n/a
      </li>

      <li>
        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="editMenu"
          display="Edit Order"
        />

        <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="staffNotes"
          display="Staff Notes"
          count={assets.item.staffNotes.length}
        />

        <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="designer"
          display="Designer"
        />
      </li>

      <li>
        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="assignToPrintOrder"
          display="Assign To Print Order"
        />

        <span> | </span>

        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="createPrintOrder"
          display="Create Print Order"
        />
      </li>

      <li>
        <OptionLink
          menuState={menuState}
          handleClick={menuToggle}
          name="sourceFiles"
          display="Source Files"
        />

        {(assets.status === "_approved" || assets.status === "_complete") && (
          <>
            <span> | </span>
            <span className="invoice-option-link">
              Send Approved Files
            </span>{" "}
          </>
        )}
      </li>
    </>
  );
};

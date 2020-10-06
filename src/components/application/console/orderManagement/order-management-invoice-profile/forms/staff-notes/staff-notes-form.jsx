import React, { useState } from "react";
import { useDispatch } from "react-redux";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";

import { dateParser } from "./../../../../_utils";
import { updateInvoiceSegmentById } from "./../../../../../../../redux/actions/invoices/invoiceActions";

export default ({ orderId, data }) => {
  const dispatch = useDispatch();

  const [noteForm, setNoteForm] = useState({ staffNote: "", activeNote: null });

  const noteFormChange = (e) => {
    setNoteForm({ ...noteForm, [e.target.name]: e.target.value });
  };

  const noteFormSubmit = async () => {
    try {
      const result = await dispatch(
        updateInvoiceSegmentById({
          id: orderId,
          name: "staffNote",
          value: noteForm.staffNote,
        })
      );

      if (result.error.errorCode === "0x0") {
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleStaffNote = (index) => {
    const activeNote = noteForm.activeNote === index ? null : index;
    setNoteForm({ ...noteForm, activeNote });
  };

  return (
    <>
      <span
        id={`staffNotes-${orderId}`}
        className={`editMenuClasser editMenuClasser-${orderId}`}
      >
        {data.map((m, index) => (
          <li key={index}>
            <span
              className="staff-note-link"
              onClick={() => toggleStaffNote(index)}
            >
              {dateParser(m.date, "xm", true)} -{" "}
              <span
                className={`staff-notes-pre ${
                  index === noteForm.activeNote && "active-staff-notes-pre"
                }`}
              >
                {m.note.substring(0, 15)}
              </span>
            </span>

            {index === noteForm.activeNote && (
              <div className="active-staff-notes">{m.note}</div>
            )}
          </li>
        ))}

        <li>
          <Form.Group as={Row} className="formGroupRow">
            <Col>
              <Form.Control
                as="textarea"
                rows={5}
                size="sm"
                placeholder="message..."
                name={"staffNote"}
                value={noteForm.staffNote}
                onChange={(e) => noteFormChange(e)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row}>
            <Col>
              <Button
                variant="primary"
                type="submit"
                size="sm"
                onClick={(e) => noteFormSubmit()}
                block
              >
                Submit
              </Button>
            </Col>
          </Form.Group>
        </li>
      </span>
    </>
  );
};

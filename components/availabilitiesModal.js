import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { isReservedBy, isAvailable } from "../lib/calendarHelper";
import Availability from "./availability";
import ModalS from "./modalS";
import MessageModal from "./messageModal";
import PageNavagation from "./pageNavagation";
import { areAllValidNumbers } from "../lib/addAvailabilityHelper";

export default function AvailabilitiesModal(props) {
  const [message, setMessage] = useState({ body: "", isError: false });
  const router = useRouter();
  const limitForAPage = 9;
  const pages = Math.ceil(props.availabilities.length / limitForAPage);
  const [currentPage, setCurrentPage] = useState(1);

  const updateReservation = ({ reservationId = null, isCancelling = false }) => {
    const data = { student_id: props.studentInfo.id };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_DOMAIN}/api/v0/class_availabilities/${reservationId}?cancel=${isCancelling}`;
    axios
      .patch(url, data, { withCredentials: true })
      .then(() => {
        router.reload();
      })
      .catch((error) => {
        setMessage({ body: error.response.data.message, isError: true });
      });
  };
  return (
    <>
      <ModalS onClickClose={props.onClickClose}>
        <ul>
          {props.availabilities
            .slice(limitForAPage * (currentPage - 1), limitForAPage * currentPage)
            .map((value) => {
              let status = "";
              let isCancelling = false;
              let reservedBy = "";
              if (isReservedBy(props.studentInfo.id, value)) {
                status = "reservedByTheUser";
                isCancelling = true;
                reservedBy = value.reservedBy.name;
              } else if (isAvailable(value)) {
                status = "available";
                isCancelling = false;
                reservedBy = null;
              } else {
                status = "full";
                isCancelling = false;
                reservedBy = value.reservedBy.name;
              }
              return (
                <li key={value.id}>
                  <Availability
                    status={status}
                    onClick={() => {
                      updateReservation({ reservationId: value.id, isCancelling: isCancelling });
                    }}
                    reservedBy={reservedBy}
                  />
                </li>
              );
            })}
        </ul>

        <PageNavagation
          pages={pages}
          setPage={(value) => {
            setCurrentPage(value);
          }}
          currentPage={currentPage}
        />
      </ModalS>
      {message.body && (
        <MessageModal
          message={message.body}
          isError={message.isError}
          onClickClose={() => {
            setMessage({ body: "", isError: false });
          }}
        />
      )}
    </>
  );
}

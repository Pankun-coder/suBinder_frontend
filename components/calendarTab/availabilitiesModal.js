import axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";
import { isReservedBy, isAvailable } from "lib/calendarHelper";
import Availability from "components/calendarTab/availability";
import ModalS from "components/common/modalS";
import MessageModal from "components/common/messageModal";
import PageNavagation from "components/common/pageNavagation";

export default function AvailabilitiesModal(props) {
  const [message, setMessage] = useState({ body: "", isError: false });
  const router = useRouter();
  const limitForAPage = 8;
  const pages = Math.ceil(props.availabilities.length / limitForAPage);
  const [currentPage, setCurrentPage] = useState(1);

  const updateReservation = ({ reservationId = null, isCancelling = false }) => {
    const data = { student_id: props.studentInfo.id };
    const url = `${process.env.NEXT_PUBLIC_BACKEND_ORIGIN}/api/v0/class_availabilities/${reservationId}?cancel=${isCancelling}`;
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
        <div className="h-full w-full md:h-full flex flex-col items-center">
          <span className="bg-purple-400 mt-0 text-gray-100 font-bold text-xl inline-block w-full md:text-4xl">
            予約枠
          </span>
          <div className="flex flex-col items-center justify-center grow">
            <ul>
              {props.availabilities
                .slice(limitForAPage * (currentPage - 1), limitForAPage * currentPage)
                .map((value) => {
                  let status = "";
                  let isCancelling = false;
                  if (isReservedBy(props.studentInfo.id, value)) {
                    status = "reservedByTheUser";
                    isCancelling = true;
                  } else if (isAvailable(value)) {
                    status = "available";
                    isCancelling = false;
                  } else {
                    status = "full";
                    isCancelling = false;
                  }
                  return (
                    <li className="inline" key={value.id}>
                      <Availability
                        status={status}
                        onClick={() => {
                          updateReservation({
                            reservationId: value.id,
                            isCancelling: isCancelling,
                          });
                        }}
                        reservedBy={value.reservedBy.name}
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
          </div>
        </div>
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

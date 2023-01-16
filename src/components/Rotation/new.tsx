import React, { useState, useEffect, useRef } from 'react';
import { getAuth } from '@cert/AuthStorage';
import '@css/Rotation/New_Rotation.scss';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

export const NewRotate = () => {
  const currentDate = new Date();
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1;
  const intraId = getAuth() ? getAuth().id : null;
  const [value, onChange] = useState(new Date());
  const [unavailableDates, setUnavailableDates] = useState([]);
  const [openSelectModal, setOpenSelectModal] = useState(false);

  const onClickDay = (value) => {
    const date = value.getDate();
    if (unavailableDates.indexOf(date) > -1) {
      setUnavailableDates(unavailableDates.filter((e) => e != date));
    } else {
      setUnavailableDates([...unavailableDates, date]);
    }
  };

  const onClickSetDateModal = () => {
    setOpenSelectModal(!openSelectModal);
  };

  const resetDates = () => {
    setUnavailableDates([]);
  };

  return (
    <>
      <div className="rotation--wrapper">
        <div className="rotation--title">
          {intraId} 님, {year} {month}월 사서 로테이션에 참여하시나요 ?
        </div>
        <div className="rotation--button">
          <div>
            <button onClick={onClickSetDateModal}>Yes!</button>
          </div>
          <div>
            <button>신청 취소</button>
          </div>
        </div>
        {openSelectModal ? (
          <div className="rotation--selectDates">
            <div className="rotation-selectDates-title">
              <p>참여가 어려운 날짜를 선택해주세요 !</p>
              <p>해당 날짜를 고려해서 랜덤 매칭이 이루어집니다</p>
            </div>
            <div>
              <Calendar onClickDay={(value) => onClickDay(value)} value={value}></Calendar>
            </div>
            <div className="rotation--viewSelectDates">
              <div className="rotation-viewSelectDates-title">선택한 날짜</div>
              <div className="rotation--selectDates-box">
                {unavailableDates.map((e) => (
                  <span>{e} </span>
                ))}
              </div>
              <button onClick={resetDates}>reset</button>
            </div>
            <button>선택 완료!</button>
          </div>
        ) : null}
      </div>
    </>
  );
};

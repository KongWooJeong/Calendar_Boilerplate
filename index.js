/* 각 html 태그정보를 변수에 할당. */
const divDate = document.querySelector(".current-date"), // 현재 날짜 태그를 감싸고 있는 div 태그
    calender = document.querySelector("tbody"), // 캘린더 테이블에서 날짜를 표시하는 부분인 tbody 태그
    td = document.getElementsByTagName("td"), // 각 날짜의 td 태그
    prevBtn = document.querySelector(".prev"), // 이전 달로 가는 태그
    nextBtn = document.querySelector(".next"), // 다음 달로 가는 태그
    pDay = divDate.children[0], // 현재 요일 표시
    pDate = divDate.children[1], // 현재 날짜 표시
    pMonYear = document.querySelector(".current-month"); // 현재 년도 표시

/* Date 객체의 요일, 월은 각 index 번호로 반환되기 떄문 해당 요일, 월을 배열로 선언하여 사용 */
const DAY_WEEK = ["SUN", "MON", "TUH", "WED", "THU", "FRI", "SAT"];
const MONTH = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];

/* Date객체를 생성하여 변수에 할당. */
const date = new Date(), // 해당 date 객체를 사용하여 캘리더 날짜 표시, 달이 바뀔때도 해당 date 객체를 기준으로 사용
      currentDate = new Date(); // 현재 날짜를 저장하고 있는 current 객체

/* 캘리더 정보 초기화 */
/* 달이 바뀔때 날짜 정보를 출력하기전에 기존에 있던 캘린더를 초기화한다. */
function resetCalender() {
    for(var i = 0; i<6; i++) {
        // 1주차, 2주차, 3주차.. 행 기준으로 반복

        for(var j=0; j<7; j++) {
            // 월, 화, 수, 목.. 열 기준으로 반복

            calender.children[i].children[j].innerText = ""; // 초기화 하기위해 빈문자열 할당.
        }
    }
}

/* 화면 캘린더 정보 출력*/
function displayCalender() {
    const firstDate = new Date(`${date.getFullYear()}/${MONTH[date.getMonth()]}/1`); // 달이 바뀔때 날짜를 "1"일로 초기화
    const nowMonth = firstDate.getMonth(); // 해당 달의 정보를 저장.

    for(var i=0; i<6; i++) {
        for(var j=firstDate.getDay(); j<7; j++) {

            /* 날짜가 증가하면 해당 달이 바뀌게 되는데 처음 지정한 달의 값과 같을때만 실행 */
            if (nowMonth === firstDate.getMonth()) { 
                calender.children[i].children[firstDate.getDay()].innerText = firstDate.getDate(); // 날짜 표시

                calender.children[i].children[firstDate.getDay()].classList.remove("selected"); // 이전, 다음달에 같은 날짜가 존재하므로 하이라이트하기전에 모두 초기화한다.
                
                /* 현재 년도, 달, 일, 요일이 모두 같을때만 하이라이트 표시 */
                if (currentDate.toDateString() ===  firstDate.toDateString()) {
                    calender.children[i].children[firstDate.getDay()].classList.add("selected"); // 현재 날짜 하이라이트
                }
                
                firstDate.setDate(firstDate.getDate() + 1); // 날짜를 증가시킨다.
            } else {
                // 날짜가 증가함에 따라 달이 바뀌게 되면 캘린더에 표시하지 않는다.
                break;
            }
        }
    }
}

/* 년도, 날짜, 일 요일을 화면에 표시 */
function displayText() {

    /* 이전달, 다음달 이동하고 현재 달로 돌아왔을때 현재 날짜 표시하기위해 */
    /* 현재날짜의 년, 월과 이동한 캘린더의 정보의 년,월이 같을때만 현재 날짜의 currentDate객체 사용 */
    if ((currentDate.getFullYear() === date.getFullYear()) && (currentDate.getMonth() === date.getMonth())) {
        pDay.innerText = DAY_WEEK[currentDate.getDay()]; // 현재 요일 표시
        pDate.innerText = currentDate.getDate(); // 현재 날짜 표시
        pMonYear.innerText = `${MONTH[currentDate.getMonth()]} ${currentDate.getFullYear()}`; // 현재 월, 년도 표시
    } else {
        pDay.innerText = DAY_WEEK[date.getDay()]; // 요일 표시
        pDate.innerText = date.getDate(); // 날짜 표시
        pMonYear.innerText = `${MONTH[date.getMonth()]} ${date.getFullYear()}`; // 월, 년도 표시
    }
    
}

/* 날짜 화면 출력, 캘린더 표시를 하는 함수 호출 */
/* 매개변수를 넣어 이전,다음달로 이동하는 버튼을 클릭시와 페이지가 처음 로딩될때를 구분한다. */
function importDate(click) {
    if (click !== "click") {
        // 페이지가 처음 로딩될때 실행

        displayText(); // 현재 날짜 화면 표시
        displayCalender(); // 해당 날짜 기준으로 캘린더 표시
    } else {
        // 이전, 다음 달 이동 버튼 클릭시 실행

        date.setDate(1); // 화면에 출력되는 날짜를 1일 초기화 하기위해
        displayText() // 날짜 화면 표시
        resetCalender(); // 캘린더 정보 초기화 하기위해
        displayCalender(); // 캘린더 정보 화면 표시
    }
}

/* 캘린더에 날짜를 클릭하면 클릭한 날짜의 정보를 화면에 표시 */
function handleDayClick(event) {

    /* 캘린더의 날짜가 있는 부분만 클릭시 해당 코드 실행 */
    if (event.target.innerText !== "") {
        pDay.innerText = DAY_WEEK[event.target.cellIndex]; // 클릭한 날짜 객체의 프로퍼티중 cellIndex를 사용하요 요일의 인덱스값을 가져온다.
        pDate.innerText = event.target.innerText; // 날짜는 텍스트 값을 이용하여 표시
    }
    
}

/* 이전 버튼 클릭시 실행되는 함수 */
function handlePrevBtnClick() {
    const month = date.getMonth() - 1; // 이전 달로 가야하기때문 기준이 되는 date객체의 월에 -1한다.
    date.setMonth(month); // 해당 -1 한 달을 다시 date.setMonth()사용하여 지정한다.
    importDate("click"); // 클릭시 매개변수 "click" 넣어 함수 호출
}

/* 다음 버튼 클릭시 실행되는 함수 */
function handleNextBtnClick() {
    const month = date.getMonth() + 1; // 이전 달로 가야하기때문 기준이 되는 date객체의 월에 +1한다.
    date.setMonth(month); // 해당 +1 한 달을 다시 date.setMonth()사용하여 지정한다.
    importDate("click"); // 클릭시 매개변수 "click" 넣어 함수 호출
}

function init() {
    importDate();
    prevBtn.addEventListener("click", handlePrevBtnClick);
    nextBtn.addEventListener("click", handleNextBtnClick);

    /* 날짜를 클릭할때 이벤트 함수를 실행하기위해 td태그 객체 정보의 프로퍼티를 사용하여 이벤트함수 실행한다. */
    for(var i=0; i<td.length; i++) {
        td[i].addEventListener("click", handleDayClick);
    }
}

init();
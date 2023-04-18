//폭탄게임

document.addEventListener("DOMContentLoaded", () => {
    const boxs = document.querySelectorAll('.c1');
    const bt = document.querySelector('#mix');

    //초기배열 : 1이 폭탄 위치(랜덤수 생성해도 됨)
    let arr = [0, 0, 0, 0, 0, 0, 0, 0, 1];
    //flage가 true가 되면 button이 눌러지고, 그렇지 않으면 눌러지지 않음
    let flag = true;
    //하트갯수
    let cnt = 0;
    //눌러진 순서
    let selarr = [];

    //폭탄섞기 버튼
    bt.addEventListener('click', () => {
        if (flag) {
            arr.sort(() => Math.random() - 0.5)//shuffle하기 .sort()이용
            console.log(arr);
            flag = false;
            cnt = 0;
            selarr = [];
            //flag가 한번 섞으면 더이상 섞이면 안되므로 false로 바꿈
            document.querySelector('h2').innerHTML = '';
            for (let box of boxs) {
                box.innerHTML = box.getAttribute('id').replace('box', '');
            }
        }
    });

    //box 번호 넣기
    for (let box of boxs) {

        box.innerHTML = box.getAttribute('id').slice(-1);
        //replace로 바꿔서 할 수 도 있음

        //box에 click event 처리
        box.addEventListener('click', () => {
            // box.innerHTML =box.getAttribute('id').replace('box','');
            // let n = parseInt(box.getAttribute('id').slice(-1)); //문자열 가져와서 정수처리
            let n = parseInt(box.textContent); //숫자로 다 slice했기 때문에 textcontent로 가져오면 됨 -> 가져와서 정수처리

            //기존에 하트나 폭탄이 들어있는 경우
            if (isNaN(n)) return;

            if (!flag) { //flag=false 일때 폭탄게임!
                //선택항목추가
                selarr.push(n);
                cnt++;
                console.log('cnt=' + cnt);
                //폭탄,하트 구분
                if (arr[n - 1] == 0) {
                    box.innerHTML = "<img src='../IMAGE/hart.png'>"//heart
                   //hart 성공 했을때
                    if (cnt == 8) {
                        flag = true;
                        document.querySelector('h2').innerHTML = "Congratulation!"//성공메세지 출력
                        let lastArr = [1, 2, 3, 4, 5, 6, 7, 8, 9].filter((item) => !selarr.includes(item)) //.filter()사용해서 남은 숫자 하나 찾아냄
                        //  console.log('lastArr='+lastArr);
                        boxs[lastArr[0] - 1].innerHTML = "<img src='../IMAGE/hart.png'>"//찾은 숫자 하트이미지 집어넣음
                    }
                }
                else {//bomb!
                    box.innerHTML = "<img src='../IMAGE/boom.png'>"
                    flag = true; //flag=true이면 멈추도록 함
                    document.querySelector('h2').innerHTML = 'BOOM!';//실패메세지 출력
                }
            }

        }
        );
    }
});
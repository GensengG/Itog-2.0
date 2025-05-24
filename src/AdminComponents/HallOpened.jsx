import "../App.jsx";
import "../App.css";
import { useState } from "react";

// Логин - shfe-diplom@netology.ru
// Пароль - shfe-diplom

export const HallOpened = () => {    
    
    function hideSection(e) {
        e.preventDefault();
        const sectionBody = document.getElementById("hall__opened__body");
        sectionBody.classList.toggle('active');
    }

    let hallsResponse = [];
    let hallArr = [];
    let hallElements = [];
    let hallConfig = [];
    let hallOpen = 0;
    let hallId = 0;
    let [halls, setHalls] = useState();  
    let [id, setId] = useState();
    let [open, setOpen] = useState();
    let [openInfo, setOpenInfo] = useState({text: "Выберите зал", btn: "Открыть/Закрыть зал"});
    
    fetch( 'https://shfe-diplom.neto-server.ru/alldata' )
    .then( response => response.json())
    .then( data => {
            hallsResponse = data.result.halls;
            for (let i = 0; i < hallsResponse.length; i++){
                hallArr.push(hallsResponse[i]["hall_name"])
            }
            hallElements = hallArr.map(item => (
                <button type="button" className = "hall__config__name" onClick = {hallNameChecked}>
                {item}
                </button>
            ));
            setHalls(halls = hallElements);
        }
    );

    function hallNameChecked(e) {
        let hallName = e.target.textContent;
        for (let i = 0; i < hallsResponse.length; i++){
            if(hallsResponse[i]["hall_name"] === hallName){
                hallId = hallsResponse[i].id;
                hallOpen = hallsResponse[i]["hall_open"];
                setId(id = hallId);
                setOpen(open = hallOpen);
                if(hallOpen === 0){
                    let newOpenInfo = {
                        text:"Всё готово к открытию", 
                        btn:"Открыть продажу билетов",
                    }
                    setOpenInfo(openInfo = newOpenInfo);
                } else {
                    let newOpenInfo = {
                        text:"Зал уже открыт", 
                        btn:"Закрыть продажу билетов",
                    }
                    setOpenInfo(openInfo = newOpenInfo);
                }
            }
        }
    }

    function openedSave(e){
        e.preventDefault();
        const params = new FormData();

        if(open === 0){
            let newOpenInfo = {
                text:"Зал уже открыт", 
                btn:"Закрыть продажу билетов",
            }
            setOpenInfo(openInfo = newOpenInfo);
            params.set("hallOpen", "1")
        } else {
            let newOpenInfo = {
                text:"Всё готово к открытию", 
                btn:"Открыть продажу билетов",
            }
            setOpenInfo(openInfo = newOpenInfo);
            params.set("hallOpen", "0")
        };

        fetch( `https://shfe-diplom.neto-server.ru/open/${id}`, {
            method: 'POST',
            body: params 
        })
            .then( response => response.json())
            .then( data => console.log( data ));
    }

    return (
        <>
            <section className = "admin__section">
                <div className = "section__header">
                    <p className = "section__header__name">Открыть продажи</p>
                    <button className = "section__header__arrow" onClick={hideSection}> <svg xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill="#EFEFEF"><path d="M0 0h24v24H0z" fill="none"/><path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z"/></svg></button>
                </div>
                <div className = "hall__opened__body active" id = "hall__opened__body">
                    <p>Выберите зал для открытия/закрытия продаж:</p>
                    <div className = "hall__config__container">
                        {halls}
                    </div> 
                    <div className = "open__sales">
                        <p className = "text__open__sales">
                           {openInfo.text} 
                        </p>
                        <button className = "btn__open__sales" onClick={openedSave}>{openInfo.btn}</button> 
                    </div>                                
                </div>
            </section>
        </>
    );
}

export default HallOpened;
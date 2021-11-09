import React from 'react';
import './history.sass'
import {Link} from "react-router-dom";

const History = () => {

    return(
        <>
            <div className="history-content">
                <div className="text-content">
                    <h1>2002-2003: НАЧАЛО</h1>
                    <p>
                        «Ну что, Сэм, будешь у нас басистом!» - хлопнув по плечу, одним осенним утром 2002-го года сообщил
                        Иван Дерябин Самсону Емельянову перед началом уроков<br/>
                        в школе, которой ребята вместе учились. Таким образом продолжилась начавшаяся несколько загодя
                        история коллектива ВИА шк. №10 г. Тольятти и начался музыкальный
                        экспририенс для Самсона Емельянова, который в последствии трансформировался<br/>
                        в проект «Ракурс цели».<br/><br/>

                        Иван (вокал/соло-гитара) уже играл в составе ВИА, тогда в его состав входили некоторые учащиеся
                        старших классов, а так же бывшие участники группы «Немезис»,
                        гитаристом в которой был Виктор Золотов, произведший несгладимое впечатление<br/>
                        на Сэма своим умением играть и сочинять песни. На тот момент времени это был уже опытный гитарист с
                        богатым бэкграундом.<br/><br/>

                        Композиция «Крыша» (на данный момент не исполняется) стала наверное самым главным хитом школы,
                        авторство на которую принадлежит именно ему.
                        Виктор несколько раз посещал репетиции группы и иногда даже принимал в них непосредственное участие
                        на инструменте. На ритм-гитаре уже играл Роман Поляков,
                        за ударные сел Евгений Тушканов. Как и Самсон, последний не имел никакого опыта игры, но подал
                        надежды на кастинге, который устроил тогдашний руководитель ВИА (о нем – ниже).<br/><br/>
                    </p>
                </div>
                <div className="media-content">
                    <iframe className="wind-of-change" width="508" height="380" src="https://www.youtube.com/embed/9ZG6nrCq1G0" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                </div>
        </div>
            <Link to={'/full-history'} class="button" >
                <span class="button-text">Подробнее</span>
            </Link>

</>
    )

}

export default History;

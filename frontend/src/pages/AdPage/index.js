import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PageArea, Fake } from './styled';
import useAPI from '../../helpers/OlxAPI';

import { PageContainer } from '../../components/MainComponents';

const Page = () => {

    const api = useAPI();

    const { id } = useParams();

    const [loading, setLoading] = useState(true);
    const [adInfo, setAdInfo] = useState({});

    useEffect(()=>{
        const getAdInfo = async (id) => {
            const json = await api.getAd(id, true);
            setAdInfo(json);
            setLoading(false);
        }
        getAdInfo(id);

    },[]);

    const formatDate = (date) => {
        let cDate = new Date( date );
        let months = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
        let cDay = cDate.getDate();
        let cMonth = months[cDate.getMonth()];
        let cYear = cDate.getFullYear();

        return `${cDay} de ${cMonth} de ${cYear}`;
    }

    return (
        <PageContainer>
            <PageArea>
                <div className='leftSide'>
                    <div className='box'>
                        <div className='adImage'>
                            {loading && <Fake height={300} /> }
                        </div>
                        <div className='adInfo'>
                            <div className='adName'>
                                {loading && <Fake height={40} /> }
                                {adInfo.title && 
                                    <h2>{adInfo.title}</h2> }
                                {adInfo.dateCreated &&
                                    <small>Criado em {formatDate(adInfo.dateCreated)}</small>
                                }
                            </div>
                            <div className='adDescription'>
                                {loading && <Fake height={100} /> }
                                {adInfo.description}
                                <hr />
                                {adInfo.views}
                            </div>
                        </div>
                    </div>

                </div>
                <div className='rightSide'>
                    <div className='box box--padding'>
                        {loading && <Fake height={20} /> }
                    </div>
                    <div className='box box--padding'>
                        {loading && <Fake height={50} /> }    
                    </div>
                </div>
            </PageArea>
        </PageContainer>
    );

}

export default Page;
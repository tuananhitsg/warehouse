import React, {useState, useEffect} from 'react';



const ShelfItem = ({ status }) => {
  const isFull = status === 'full';
  const className = isFull ? 'shelf__item shelf__item--full' : 'shelf__item shelf__item--available';
  // const [status, setStatus] = useState('');
  // useEffect(() =>{
  //   const getItem = async () =>{
  //     try{
  //       const res = await wareHouserApi.getAllColumn();
  //       if(res){
  //         console.log(res);
  //       }
  //     }catch(error){
  //       console.log("Featch erro: ", error);
  //     }
  //   };
  // },[]);

  return <div className={className}>{status}</div>;
};

export default ShelfItem;
'use client'

import { useEffect, useState } from "react";

export default function Home()
{
  const [ newHabbit, setNewHabbit ] = useState('');
  const [ habbits, setHabbits ] = useState([]);
  const [ activeHabbit, setActivehabbit ] = useState(null);
  const [ showDrag, setShowDrag ] = useState(false);  

  const handleSubmit = (e) =>
  {
    e.preventDefault()
    setHabbits((prev)=> [...prev, newHabbit]);
    setNewHabbit('');
  }

  const handleDrop = (position) =>
  {
    const movingHabbit = habbits[activeHabbit]
    const updatedHabbits = habbits.filter((_, index) => index !== activeHabbit);
    updatedHabbits.splice(position, 0, movingHabbit);
    setHabbits(updatedHabbits)
  }

  const formatChainText = () => {
    if (habbits.length === 0) return "Start building your habit chain...";
    if (habbits.length === 1) return `I ${habbits[0]}`;
    
    let text = "";
    habbits.forEach((habbit, index) => {
      if (index === 0) {
        text += `After I ${habbit}`;
      } else if (index === habbits.length - 1 && habbits.length !== 2) {
        text += `, then I ${habbit}`;
      } else {
        text += `, I ${habbit}`;
      }
    });
    return text + ".";
  };

  return(
    <div>
      <div className="max-w-4xl mx-auto py-12">
        <div className="text-center">
          <h1 className="text-5xl font-bold bg-clip-text mb-4">
            Habit Stack Builder
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build your perfect day, one habit at a time.
          </p>
        </div>
      </div>

      <div className="mb-8 p-8">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-500 mb-6">Your Habit Chain</h2>
          <div className="text-lg leading-relaxed text-gray-700 min-h-[60px] flex items-center justify-center bg-blue-50 rounded-lg p-6 border-l-4 border-r-4  border-blue-500">
              <p className="text-xl font-semibold">{formatChainText()}</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="px-8 flex gap-4">
          <input placeholder="Enter your habit here" className="bg-blue-50 flex-1 p-4 border-l-4 text-lg border-blue-500 rounded-lg text-black" value={newHabbit} onChange={(e)=> setNewHabbit(e.target.value)}/>
          <button type="submit" className="bg-blue-400 hover:bg-blue-600 rounded-lg p-4 text-white cursor-pointer">Add habbit</button>
        </form>
      
        {habbits.length ? <div className="px-8">
          <p className={showDrag ? 'text-md p-2 rounded my-2' : 'opacity-0' } onDragEnter={() => setShowDrag(true)} onDragLeave={()=> setShowDrag(false)} onDragOver={(e)=> e.preventDefault()} onDrop={()=> {handleDrop(0); setShowDrag(false)}}>Drop here</p>
          {habbits.map((habbit, index)=>
          (
            <HabbitCard
            habbit={habbit}
            index={index}
            setActivehabbit={setActivehabbit}
            handleDrop={handleDrop}
            key={index}/>
          ))}
          </div>: <p className="text-center text-lg font-semibold p-6">Start adding your habits</p>}
      </div>
    )
} 

export function HabbitCard({habbit, index, setActivehabbit, handleDrop})
{
  const [ showDrag, setShowDrag ] = useState(false);

  return(
    <div className="" key={index}>
      <div className="p-6 bg-blue-200 text-lg font-semibold border-blue-400 border-l-4 rounded-lg hover:cursor-grab text-black" key={index} draggable onDrag={()=> setActivehabbit(index)} onDragEnd={()=> setActivehabbit(null)}>{habbit}</div>
      <p className={showDrag ? 'text-md p-2 rounded my-2' : 'opacity-0' } onDragEnter={() => setShowDrag(true)} onDragLeave={()=> setShowDrag(false)} onDragOver={(e)=> e.preventDefault()} onDrop={()=> {handleDrop(index+1); setShowDrag(false)}}>Drop here</p>  
    </div>
  )
}

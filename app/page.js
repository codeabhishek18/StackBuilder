'use client'

import { GripVertical, Move, Trash } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function Home()
{
  const [ newHabit, setNewHabit ] = useState('');
  const [ habits, setHabits ] = useState([]);
  const [ activeHabit, setActivehabit ] = useState(null);
  const [ showDrag, setShowDrag ] = useState(false);  

  const handleSubmit = (e) =>
  {
    e.preventDefault();

    if(newHabit.trim())
    {
      setHabits((prev)=> [...prev, newHabit]);
      setNewHabit('');
      toast.success('New habit added')
    }
    else
      toast.warn('Please enter a habit before adding!')
  }

  const handleDrop = (position) =>
  {
    const movingHabbit = habits[activeHabit]
    const updatedHabits = habits.filter((_, index) => index !== activeHabit);
    updatedHabits.splice(position, 0, movingHabbit);
    setHabits(updatedHabits)
  }

  const removeHabbit = (position) =>
  {
    const updatedHabits = habits.filter((_, index) => index !== position);
    setHabits(updatedHabits)
    toast.success('Habit removed')
  }

  const formatChainText = () => {
    if (habits.length === 0) return "Start building your habit chain...";
    if (habits.length === 1) return `I ${habits[0]}`;
    
    let text = "";
    habits.forEach((habbit, index) => {
      if (index === 0) {
        text += `After I ${habbit}`;
      } else if (index === habits.length - 1 && habits.length !== 2) {
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
          <input placeholder="Enter your habit here" className="bg-blue-50 flex-1 p-4 border-l-4 text-lg border-blue-500 rounded-lg text-black" value={newHabit} onChange={(e)=> setNewHabit(e.target.value)}/>
          <button type="submit" className="bg-blue-400 hover:bg-blue-500 rounded-lg p-4 text-white cursor-pointer">Add habit</button>
        </form>
      
        {habits.length ? <div className="px-8">
          <p className={showDrag ? 'text-md p-2 rounded my-2' : 'opacity-0' } onDragEnter={() => setShowDrag(true)} onDragLeave={()=> setShowDrag(false)} onDragOver={(e)=> e.preventDefault()} onDrop={()=> {handleDrop(0); setShowDrag(false)}}>Drop here</p>
          {habits.map((habbit, index)=>
          (
            <HabbitCard
            habbit={habbit}
            index={index}
            setActivehabit={setActivehabit}
            handleDrop={handleDrop}
            removeHabbit={removeHabbit}
            key={index}/>
          ))}
          </div>: <p className="text-center text-lg font-semibold p-6">Start adding your habits</p>}
      </div>
    )
} 

export function HabbitCard({habbit, index, setActivehabit, handleDrop, removeHabbit})
{
  const [ showDrag, setShowDrag ] = useState(false);

  return(
    <div className="" key={index}>
      <div 
        className="flex items-center justify-between p-6 pl-2 bg-blue-100 text-lg font-semibold
                   border-blue-400 border-l-4 rounded-lg text-black" 
        key={index}>
        <div className="flex items-center gap-4" draggable onDrag={()=> setActivehabit(index)} onDragEnd={()=> setActivehabit(null)}>
          <GripVertical className="hover:cursor-grab" size={24}/>
          <p>{habbit}</p>
        </div>
        <Trash size={20} className="text-blue-400 cursor-pointer" onClick={()=> removeHabbit(index)}/>
        </div>
      <p className={showDrag ? 'text-md p-2 rounded my-2' : 'opacity-0' } onDragEnter={() => setShowDrag(true)} onDragLeave={()=> setShowDrag(false)} onDragOver={(e)=> e.preventDefault()} onDrop={()=> {handleDrop(index+1); setShowDrag(false)}}>Drop here</p>  
    </div>
  )
}



import {  useRef,useCallback,useState} from 'react'
import { CiClock2 } from "react-icons/ci";

import './App.css'
// import Eventsscroller from './eventsscroller'
// const [active,setActive]= useState("1")

function App() {
  // const [count, setCount] = useState(0)
  return (
    
    <div className='mt-[200px] flex gap-[100px]'>
    
      <Eventsscroller cardNumbers={6} cardData={[{date:1},{date:2},{date:3},{date:4},{date:5},{date:6}]}></Eventsscroller>
      
      
    
    </div>
  )
}
 interface EventScrollerProps{
  cardNumbers:number,
  cardData:EachDivProps[]
 }
 export interface EachDivProps {
  date:number,
  day?:string,
  heading?:string,
  content?:string


}


const Eventsscroller = ({cardNumbers,cardData}:EventScrollerProps) => {
  const divRef = useRef<HTMLDivElement | null>(null)
  


  const smoothScroll = useCallback((element:any| HTMLElement, target: number, duration: number) => {
    const start = element.scrollTop;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const t = elapsedTime / duration;
        element.scrollTop = start + change * (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
        requestAnimationFrame(animateScroll);
      } else {
        element.scrollTop = target;
      }
    };

    requestAnimationFrame(animateScroll);
  }, []);

  const handleScroll = useCallback((e: React.WheelEvent) => {
    e.preventDefault(); 

    if (divRef.current) {
      const scrollAmount = e.deltaY > 0 ? 170 : -170;
      const duration = e.deltaY > 0 ? 900 : 900; // Slower for downward, faster for upward
      const target = divRef.current.scrollTop + scrollAmount;

      smoothScroll(divRef.current, target, duration);
    }
  }, [smoothScroll]);
  return (
    <div className='w-[500px] h-[350px] shadow-xl border border-solid border-gray-300 rounded-3xl py-[40px] '>
      <div ref={divRef} onWheel={handleScroll} style={{
          maskImage: 'linear-gradient(to bottom, black 20%, black 30%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 20%, black 30%, transparent 90%)',
        }} className=' my-[30px] w-[400px] h-[290px] mx-[50px]   overflow-y-scroll scrollbar-hide'>
         {cardData.map((element)=> <Eachdiv date={element.date}  />)}<EndDiv/></div>
    </div>
  )
}


  


const EndDiv=()=>{
  return(
    <div className='h-[130px]  '>
      <div className='w-[40px] pt-[10px]'></div>
      <div className=' w-full'></div>
    </div>
  )
}
 
const Eachdiv = ({date,day,heading,content}:EachDivProps) => {
  
  
  
  return (
    <div className='h-[150px] font-sans flex gap-[40px] mb-[20px] '>
      <div className='w-[80px] pt-[10px] flex flex-col'>
        <div className='font-semibold text-4xl'>{date}</div>
        <div className=' font-medium text-xl'>{day}</div>
      </div>
      <div className=' w-full'><Minicard heading={heading}  content={content}/></div>
    </div>
  )

 
}
interface MinicardProps{
  heading: string| undefined,
  content: string| undefined
 }
const Minicard= ({heading,content}:MinicardProps)=>{

  return (
    <div className=' shadow-xl h-[120px] p-[5px] rounded-2xl '>
      <div className=' font-semibold font-sans text-xl  p-[5px] text-left'>{heading}

      </div>
      <div className='font-normal font-sans text-normal p-[2px] text-left mt-[5px] text-gray-800'>
          {content}
      </div>
         
    </div>
  )
}





export default App

style={{
  maskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 10%, black 90%, transparent 100%)',
}}

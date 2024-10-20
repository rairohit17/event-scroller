import {  useRef,useCallback,useState,useEffect} from 'react'

import './App.css'



function App() {
  // const [count, setCount] = useState(0)
  return (
    
    <div className='mt-[200px] flex gap-[100px]'>
    
      <EventScroller cardData={[{date:1},{date:2},{date:3}]}></EventScroller>
      
      
    
    </div>
  )
}
 interface EventScrollerProps{
 
  cardData:EachDivProps[]
 }
 export interface EachDivProps {
  date:number,
  day?:string,
  heading?:string,
  content?:string,
  


}





const EventScroller= ({ cardData }:EventScrollerProps) => {
  const [arr, setArr] = useState<EachDivProps[]>(cardData);
  const divRef = useRef<HTMLDivElement | null>(null);
  const isScrollingRef = useRef(false);

  const addMoreItems = useCallback(() => {
    setArr(prevArr => [...prevArr, ...cardData]);
  }, [cardData]);

  const checkScrollPosition = useCallback(() => {
    if (divRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = divRef.current;
      if (scrollTop + clientHeight >= scrollHeight - 200) {
        addMoreItems();
      }
    }
  }, [addMoreItems]);

  const smoothScroll = useCallback((target: number, duration: number) => {
    if (!divRef.current) return;

    const start = divRef.current.scrollTop;
    const change = target - start;
    const startTime = performance.now();

    const animateScroll = (currentTime: number) => {
      if (!divRef.current) return;

      const elapsedTime = currentTime - startTime;
      if (elapsedTime < duration) {
        const t = elapsedTime / duration;
        divRef.current.scrollTop = start + change * (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t);
        requestAnimationFrame(animateScroll);
      } else {
        divRef.current.scrollTop = target;
        isScrollingRef.current = false;
        checkScrollPosition();
      }
    };

    isScrollingRef.current = true;
    requestAnimationFrame(animateScroll);
  }, [checkScrollPosition]);

  const handleWheel = useCallback((e: WheelEvent) => {
    e.preventDefault();
    if (isScrollingRef.current || !divRef.current) return;

    const scrollAmount = e.deltaY > 0 ? 170 : -170;
    const duration = 500;
    const target = divRef.current.scrollTop + scrollAmount;

    smoothScroll(target, duration);
  }, [smoothScroll]);

  useEffect(() => {
    const currentDiv = divRef.current;
    if (currentDiv) {
      currentDiv.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (currentDiv) {
        currentDiv.removeEventListener('wheel', handleWheel);
      }
    };
  }, [handleWheel]);

  return (
    <div className='w-[500px] h-[350px] shadow-xl border border-solid border-gray-300 rounded-3xl py-[40px]'>
      <div
        ref={divRef}
        style={{maskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 30%, black 30%, transparent 90%)',
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 5%, black 30%, black 30%, transparent 90%)',

          

        }}
        className='my-[30px] w-[400px] h-[290px] mx-[50px] overflow-y-scroll scrollbar-hide'
      >
        {arr.map((element, index) => (
          <Eachdiv  date={element.date} />
        ))}
        
      </div>
    </div>
  );
};


 
const Eachdiv = ({date,day,heading,content}:EachDivProps) => {
  
  
  return (
    <div className='h-[150px] bg- font-sans flex gap-[40px] mb-[20px] '>
      <div className='w-[80px]  h-[120px] pt-[10px] rounded-2xl flex flex-col'>
        <div className='font-semibold  text-4xl'>{date}</div>
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
    <div className=' shadow-xl h-[120px]  p-[5px] rounded-2xl '>
      <div className=' font-semibold font-sans text-xl  p-[5px] text-left'>{heading}

      </div>
      <div className='font-normal font-sans text-normal p-[2px] text-left mt-[5px] text-gray-800'>
          {content}
      </div>
         
    </div>
  )
}





export default App

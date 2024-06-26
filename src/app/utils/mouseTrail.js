import {useRef, useEffect} from 'react'
import '../utils/effects.css'

const Cursor = () => {
  const dot = useRef(null), point = useRef(null), dotIcon = useRef(null), touching1 = useRef(null), touching2 = useRef(null)
  let reqRef = useRef(null)
  let curX = useRef(0), curY = useRef(0),
      pointX = useRef(0), pointY = useRef(0),
      preMouseX = useRef(0), preMouseY = useRef (0),
      curSkew = useRef(0), curAngle = useRef(0), curScale = useRef(0),
      deltX = useRef(0), deltY = useRef(0),
      check = useRef(null), type = null
  
   useEffect(() => {
   document.addEventListener('mousemove', mouseMove)
   document.addEventListener('mouseenter', mouseEnter)
   document.addEventListener('mouseleave', mouseLeave)
  animMove()
  return () => {
    document.removeEventListener('mousemove', mouseMove)
    document.removeEventListener('mouseenter', mouseEnter)
    document.removeEventListener('mouseleave', mouseLeave)
    cancelAnimationFrame(reqRef.current)
  }
}, [])

  const mouseMove = e => {
   curX.current = e.pageX
   curY.current = e.pageY
   point.current = e.target.closest('#bento > div')
   check.current = e.target.closest('#footer')
   type = point.current.dataset.type
  }

  const mouseEnter = e => { 
   let opacity = 1
   let timer = setInterval(function() {
      if(opacity >= 0){
         clearInterval(timer)
      }
      dot.current.style.opacity = opacity
      opacity += 0.05
   }, 10)
  }

  const mouseLeave = e => { 
   let opacity = dot.current.style.opacity
   let timer = setInterval(function() {
      if(opacity <= 0){
         clearInterval(timer)
      }
      dot.current.style.opacity = opacity
      opacity -= 0.05
   }, 10)
  }

   const dotIconClass = type => {
      switch(type) {
         case "look":
            return "fa-solid fa-eyes"
         case "read":
            return "fa-regular fa-book-open"
         case "star":
            return "fa-regular fa-stars"
         default:
            return ""
    }
   }

  const animMove = () => {
   pointX.current += (curX.current - pointX.current) * 0.1
   pointY.current += (curY.current - pointY.current) * 0.1
   touching1.current = point.current !== null
   touching2.current = check.current !== null
   dot.current.dataset.type = touching1.current ? type : ''
   const translationT = `translateX(${pointX.current}px) translateY(${pointY.current}px)`
   deltX.current = pointX.current - preMouseX.current
   deltY.current = pointY.current - preMouseY.current
   preMouseX.current = pointX.current
   preMouseY.current = pointY.current

   dotIcon.current.className = dotIconClass(type)

   const velo = Math.min(Math.sqrt(deltX.current**2 + deltY.current**2) * 4, 200)
   const scalingSpeed = (velo / 200) * 0.5
   const scaling = `${touching1.current ? 2:0.5}`
   curSkew.current += (scalingSpeed - curSkew.current) * 0.5
   curScale.current += (scaling - (curScale.current)) * 0.2

   const scalationT = `scaleX(${1 + curSkew.current}) scaleY(${1 - curSkew.current})`
   const scalationT2= `scaleX(${1 - curSkew.current}) scaleY(${1 + curSkew.current})`

   const angle = (Math.atan2(deltY.current, deltX.current) * 180 / Math.PI)
   
   curAngle.current += (angle - curAngle.current) * 1
   const rotationT = `rotate(${curAngle.current}deg)`
   const rotationT2= `rotate(${360 - curAngle.current}deg)`

   dotIcon.current.style.transform = `${scalationT2} ${rotationT2}`
   if(touching1.current == true && touching2.current == true){
      curScale.current += (scaling - (curScale.current *10)) * 0.2
      dot.current.style.transform = `${translationT} ${rotationT} ${scalationT} scale(${curScale.current})`
   }else{
      dot.current.style.transform = `${translationT} ${rotationT} ${scalationT} scale(${curScale.current})`
   }
   reqRef.current = requestAnimationFrame(animMove)
  }
  return(
    <>
      <div ref={dot} className='dot'>
         <i ref={dotIcon} id='dotIcon'></i>
      </div>
    </>
  )
}
export default Cursor
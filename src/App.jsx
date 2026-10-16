import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { ArrowUp, Menu, X } from 'lucide-react'
import { gsap } from 'gsap'
import { letters, poems, promises, reasons, sweetNotes } from './data/content.js'
import heartUniverse from './data/heart-nodes.json'

const nav = [['welcome','Welcome'],['gift','A little gift'],['game','Heart catcher'],['reasons','Love notes'],['poetry','Shayari'],['letters','Open when'],['promises','Promises'],['letter','A letter'],['hug','Hug machine'],['universe','Heart universe'],['finale','Birthday']]
const smooth = id => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })

function BearPair({ small = false }) {
  const [react,setReact]=useState(false)
  return <button type="button" className={`bear-pair ${small ? 'bear-small' : ''} ${react?'bear-react':''}`} aria-label="Tap the little bears to make them react" onClick={()=>{setReact(true);setTimeout(()=>setReact(false),850)}}>
    <span className="bear-heart">♥</span>
    <div className="bear bear-one"><i/><b/><em>ᴗ</em><span>♡</span></div>
    <div className="bear bear-two"><i/><b/><em>ᴗ</em><span>♡</span></div>
  </button>
}

function ConnectedHeart({ interactive = false }) {
  const [active, setActive] = useState([])
  return <div className={`heart-art ${interactive ? 'heart-interactive' : ''}`}>
    <div className="heart-graphic"><img src={`${import.meta.env.BASE_URL}generated/colorful-heart.svg`} alt={interactive ? 'Tap the connected heart to discover a little message' : 'A pastel heart made of colorful connected lines'} onClick={() => interactive && setActive(a => [...a, heartUniverse.nodes[0].id])} />
    {interactive && <><svg className="heart-links" viewBox={`0 0 ${heartUniverse.viewBox[0]} ${heartUniverse.viewBox[1]}`} aria-hidden="true">{heartUniverse.edges.map(([from,to])=>{const a=heartUniverse.nodes[from],b=heartUniverse.nodes[to];return <line key={`${from}-${to}`} className={active.includes(from)||active.includes(to)?'constellation-edge glowing':'constellation-edge'} x1={a.x} y1={a.y} x2={b.x} y2={b.y}/>})}</svg><div className="heart-hotspots">{heartUniverse.nodes.map(node => <button key={node.id} className={`heart-hotspot ${active.includes(node.id) ? 'lit' : ''}`} style={{left:`${node.left}%`,top:`${node.top}%`}} aria-label={`Discover heart message ${node.id+1}`} onClick={() => setActive(a => [...a, node.id])}>♥</button>)}</div></>}</div>
    {interactive && <AnimatePresence mode="wait"><motion.p key={active.length ? active[active.length-1] : 'hint'} className="heart-message" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-6}}>{active.length ? heartUniverse.nodes[active[active.length-1]]?.message : 'Tap the little hearts. They have something to tell you. 💗'}</motion.p></AnimatePresence>}
    {interactive && active.at(-1)===5 && <motion.div className="heart-bear-reveal" initial={{scale:0}} animate={{scale:.62}}><BearPair small/></motion.div>}
  </div>
}

function HeroSecretHeart() {
 const [open,setOpen]=useState(false)
 return <div className="hero-secret"><button aria-expanded={open} onClick={()=>setOpen(!open)}>♡ <span>psst, a tiny secret</span></button>{open&&<motion.p initial={{opacity:0,y:7}} animate={{opacity:1,y:0}}>You make this little universe feel like home. 💗</motion.p>}</div>
}

function HugMachine() {
 const [action,setAction]=useState('idle')
 const respond=(kind)=>{setAction(kind);setTimeout(()=>setAction('idle'),kind==='hug'?2600:1700)}
 return <div className={`hug-machine hug-${action}`}><div className="hug-bears"><BearPair/><span className="hug-between">♥</span></div><p className="hug-message" aria-live="polite">{action==='hug'?'A little hug for the days when I can’t be right beside you. ❤️':action==='dance'?'A tiny dance, just to make you smile. 💃':action==='kiss'?'Sending you a pocketful of kisses. 😘':'Two little bears, ready whenever you need a hug.'}</p><div className="hug-controls"><button className="button button-primary" onClick={()=>respond('hug')}>Send me a hug 🧸</button><button className="button button-outline" onClick={()=>respond('hug')}>One more hug</button><button className="button button-outline" onClick={()=>respond('dance')}>Make them dance ✨</button><button className="button button-outline" onClick={()=>respond('kiss')}>Send a kiss 💋</button></div><button className="text-link" onClick={()=>setAction('idle')}>Reset the bears ↺</button></div>
}

function HiddenHeart({index,onFind,found}) {
 return <button className={`hidden-heart hidden-heart-${index} ${found?'found':''}`} aria-label={found?'Hidden heart found':`Find hidden heart ${index} of 5`} aria-pressed={found} onClick={onFind}>{found?'♥':'♡'}</button>
}

function AffectionButton() {
 const [note,setNote]=useState(''), [previous,setPrevious]=useState(-1)
 const tell=()=>{const available=sweetNotes.map((_,i)=>i).filter(i=>i!==previous);const i=available[Math.floor(Math.random()*available.length)];setPrevious(i);setNote(sweetNotes[i])}
 return <div className="affection-widget"><button className="affection-button" onClick={tell} aria-label="Tell me something sweet">♡</button><AnimatePresence>{note&&<motion.div className="affection-note" initial={{opacity:0,y:8}} animate={{opacity:1,y:0}} exit={{opacity:0,y:6}}><button aria-label="Close sweet message" onClick={()=>setNote('')}>×</button>{note}</motion.div>}</AnimatePresence></div>
}

function Opening({ onOpen, onSkip }) {
  const scene = useRef(null)
  const reduceMotion=useReducedMotion()
  const balloonOne=reduceMotion?{y:0,rotate:0}:{y:[0,-18,0],rotate:[-5,4,-5]}
  const balloonTwo=reduceMotion?{y:0,rotate:0}:{y:[-5,12,-5],rotate:[4,-5,4]}
  const balloonThree=reduceMotion?{y:0,rotate:0}:{y:[0,-14,0],rotate:[3,-4,3]}
  useEffect(() => {
    if (reduceMotion) return
    const ctx = gsap.context(() => {
      gsap.timeline({ defaults: { ease: 'sine.inOut' } })
        .fromTo('.bear-one', { x: -24, y: 9 }, { x: 0, y: 0, duration: 2.2 }, 1.1)
        .fromTo('.bear-two', { x: 24, y: 9 }, { x: 0, y: 0, duration: 2.2 }, 1.1)
        .fromTo('.bear-heart', { scale: .6, opacity: .3 }, { scale: 1.15, opacity: 1, duration: .5, repeat: 1, yoyo: true }, 3.2)
    }, scene)
    return () => ctx.revert()
  }, [reduceMotion])
  return <motion.div className="opening" initial={{opacity:1}} exit={{opacity:0, scale:1.08, filter:'blur(12px)'}} transition={{duration:0.85}}>
    <div ref={scene} className="opening-inner">
    <div className="opening-cloud cloud-a"/><div className="opening-cloud cloud-b"/>
    <div className="opening-sparkles" aria-hidden="true">✦　·　♡　　 ✧　　 ·　　 ♡　　 ✦</div>
    <div className="loader-balloons" aria-hidden="true"><motion.span className="loader-balloon balloon-pink" animate={balloonOne} transition={{duration:3.8,repeat:reduceMotion?0:Infinity,ease:'easeInOut'}}>🎈</motion.span><motion.span className="loader-balloon balloon-lilac" animate={balloonTwo} transition={{duration:4.4,repeat:reduceMotion?0:Infinity,ease:'easeInOut',delay:reduceMotion?0:.7}}>🎈</motion.span><motion.span className="loader-balloon balloon-peach" animate={balloonThree} transition={{duration:4,repeat:reduceMotion?0:Infinity,ease:'easeInOut',delay:reduceMotion?0:1.1}}>🎈</motion.span></div>
    <motion.div className="loader-letter letter-pop-one" initial={reduceMotion?false:{opacity:0,scale:.45,rotate:-12}} animate={reduceMotion?{opacity:1,scale:1}:{opacity:[0,1,1],scale:[.45,1,1],rotate:[-12,-5,-5]}} transition={{delay:reduceMotion?0:2.2,duration:reduceMotion?0:1.1}} aria-hidden="true">A tiny note<br/>just for you <span>✉</span></motion.div>
    <motion.div className="loader-letter letter-pop-two" initial={reduceMotion?false:{opacity:0,scale:.45,rotate:10}} animate={reduceMotion?{opacity:1,scale:1}:{opacity:[0,1,1],scale:[.45,1,1],rotate:[10,5,5]}} transition={{delay:reduceMotion?0:4.1,duration:reduceMotion?0:1.1}} aria-hidden="true">You make my<br/>world brighter <span>♡</span></motion.div>
    <BearPair small />
    <p className="eyebrow">A little something, made with love</p>
    <h1>Preparing a little universe<br/>for my <span>Mottoo…</span></h1>
    <ConnectedHeart />
    <p className="opening-note">Somewhere between a thousand words and one little heart… there's you.</p>
    <motion.p className="opening-ready" initial={{opacity:0,y:12}} animate={{opacity:1,y:0}} transition={{delay:6,duration:.8}}>Someone very special has a birthday today… 💗</motion.p>
    <motion.button className="button button-primary opening-button" initial={{opacity:0,y:18,scale:.88}} animate={{opacity:1,y:0,scale:1}} transition={{delay:6.8,duration:.75,type:'spring',bounce:.38}} onClick={onOpen}>Open your surprise <span>↗</span></motion.button>
    <button className="skip-button" onClick={onSkip}>Skip to my surprise</button>
    </div>
  </motion.div>
}

function HeartCatcher() {
 const reduceMotion=useReducedMotion()
 const target=7
 const [status,setStatus]=useState('idle'), [score,setScore]=useState(0), [seconds,setSeconds]=useState(24), [hearts,setHearts]=useState([]), [serial,setSerial]=useState(0)
 useEffect(()=>{
   if(status!=='playing')return
   const timer=window.setInterval(()=>setSeconds(s=>{if(s<=1){setStatus('lost');return 0}return s-1}),1000)
   const spawn=window.setInterval(()=>setSerial(n=>n+1),680)
   return()=>{window.clearInterval(timer);window.clearInterval(spawn)}
 },[status])
 useEffect(()=>{
   if(status!=='playing'||serial===0)return
   const id=`heart-${serial}`
   const item={id,slot:serial,left:8+Math.random()*84,kind:serial%7===0?'star':'heart',duration:2.8+Math.random()*1.2}
   setHearts(current=>[...current.slice(-8),item])
 },[serial,status])
 const start=()=>{setScore(0);setSeconds(24);setHearts([]);setSerial(0);setStatus('playing')}
 const catchOne=id=>{
   setHearts(current=>current.filter(item=>item.id!==id))
   if(score+1>=target){setScore(target);setHearts([]);setStatus('won')}else setScore(score+1)
 }
 const title=status==='won'?'You caught the birthday heart!':status==='lost'?'The heart floated away…':status==='playing'?'Catch 7 little hearts!':'A little game, a lovely surprise.'
 return <div className={`catcher catcher-${status}`}>
   <div className="catcher-intro"><span className="eyebrow">Quick, it’s fluttering away</span><h3>{title}</h3><p>{status==='idle'?'Tap the floating hearts before they drift into the clouds. Catch seven to win your birthday gift.':status==='playing'?'Tap hearts, skip the twinkling stars, and fill your little heart meter.':'Tap play again whenever you want another go.'}</p></div>
   <div className="catcher-score" aria-live="polite"><span>♥ {score}/{target}<i className="heart-meter"><b style={{width:`${score/target*100}%`}}/></i></span><span>⌛ 0:{String(seconds).padStart(2,'0')}</span></div>
   <div className="catcher-arena" role="group" aria-label="Heart catching game area"><span className="game-cloud gc-one" aria-hidden="true"/><span className="game-cloud gc-two" aria-hidden="true"/><span className="game-star gs-one" aria-hidden="true">✦</span><span className="game-star gs-two" aria-hidden="true">✧</span>
    {status==='playing'&&hearts.map(item=><motion.button key={item.id} className={`flying-token ${item.kind==='star'?'token-star':''}`} style={{left:`${reduceMotion?7+(item.slot%4)*28:item.left}%`,...(reduceMotion?{bottom:`${24+(Math.floor((item.slot-1)/4)%2)*70}px`}:{})}} aria-label={item.kind==='star'?'A twinkling star (skip this one)':'Catch this floating heart'} initial={reduceMotion?{y:0,scale:1,opacity:1}:{y:80,scale:.45,opacity:0}} animate={reduceMotion?{y:0,scale:1,opacity:1}:{y:-370,scale:1,opacity:[0,1,1,0]}} transition={{duration:reduceMotion?0:item.duration,ease:'linear'}} onClick={()=>item.kind==='heart'&&catchOne(item.id)} onAnimationComplete={()=>{if(!reduceMotion)setHearts(current=>current.filter(h=>h.id!==item.id))}}><span>{item.kind==='star'?'✦':'♥'}</span></motion.button>)}
    {status==='idle'&&<div className="arena-center"><span>💗</span><p>Ready, Mottoo?</p></div>}
    <AnimatePresence>{status==='won'&&<motion.div className="prize-letter" initial={{opacity:0,y:24,scale:.82,rotate:-3}} animate={{opacity:1,y:0,scale:1,rotate:0}} exit={{opacity:0,y:-12}}><span>✉ A GIFT FOR YOU ✉</span><h4>You caught my heart, Mottoo!</h4><p>Your real prize is this little reminder: you are so loved, and I hope your birthday is full of everything that makes you happy. 🎁💗</p><button className="button button-primary" onClick={()=>smooth('finale')}>Take me to my birthday wish ↓</button></motion.div>}</AnimatePresence>
    {status==='lost'&&<motion.div className="missed-note" initial={{opacity:0,scale:.85}} animate={{opacity:1,scale:1}}>The heart says: “I’ll wait for you.” 💌</motion.div>}
   </div>
   {status!=='won'&&<button className="button button-primary catcher-start" onClick={start}>{status==='playing'?'Restart the game ↺':status==='lost'?'Try again ♡':'Start catching hearts ✨'}</button>}
   {status==='won'&&<button className="text-link" onClick={start}>Play again for fun ↺</button>}
 </div>
}

function Section({ id, className = '', children, label }) {
  return <section id={id} className={`chapter ${className}`} aria-label={label}>{children}</section>
}

function Gift() {
  const [open,setOpen]=useState(false), [choice,setChoice]=useState('')
  const stage=useRef(null)
  useEffect(()=>{
    if(!open||window.matchMedia('(prefers-reduced-motion: reduce)').matches)return
    const ctx=gsap.context(()=>{
      gsap.timeline().fromTo('.gift-lid',{y:0,rotation:0},{y:-52,rotation:-16,duration:.68,ease:'back.out(1.35)'}).fromTo('.gift-box',{filter:'drop-shadow(0 0 0 rgba(255,130,173,0))'},{filter:'drop-shadow(0 0 20px rgba(255,130,173,.7))',duration:.4},'-=.18')
    },stage)
    return()=>ctx.revert()
  },[open])
  return <div ref={stage} className={`gift-stage ${open?'is-open':''}`}>
    <button className="gift-box" aria-label={open?'Close birthday gift':'Open birthday gift'} aria-expanded={open} onClick={()=>setOpen(!open)}>
      <span className="gift-lid"><i/></span><span className="gift-body"><i/></span><span className="gift-bow">🎀</span>
    </button>
    <AnimatePresence>{open&&<motion.div className="gift-note" initial={{opacity:0,y:30,rotate:-4}} animate={{opacity:1,y:0,rotate:0}} exit={{opacity:0,y:14}}>
      <span className="note-stamp">A LITTLE NOTE FOR YOU</span><h3>Happy Birthday, Mottoo! 🧸💗</h3>
      <p>Mottoo, agar main tumhe ek gift de sakta, toh main chahta ki tum khud ko meri nazron se dekh pao. Shayad tab tum samajh paati ki tum kitni special ho. ❤️</p>
      <div className="gift-choices">{['A little smile','A warm hug','A secret message'].map((label,i)=><button className={choice===label?'chosen':''} key={label} onClick={()=>setChoice(label)}>{label}</button>)}</div>
      {choice&&<motion.p className="gift-choice-note" key={choice} initial={{opacity:0,y:7}} animate={{opacity:1,y:0}}>{[
        'Tumhari smile se mera din automatically better ho jaata hai. Keep that little sunshine.',
        'Imagine the warmest, safest hug. Consider it delivered, meri jaan. 🧸',
        'Secret: even in my busiest moments, tumhara khayal ek soft si smile le aata hai. ❤️',
      ][['A little smile','A warm hug','A secret message'].indexOf(choice)]}</motion.p>}
    </motion.div>}</AnimatePresence>
    <div className="gift-actions"><button className="text-link" onClick={()=>smooth('game')}>There's more, Mottoo… ↓</button>{open&&<button className="text-link" onClick={()=>{setOpen(false);setChoice('')}}>Wrap it again ↺</button>}</div>
  </div>
}

function Reasons() {
  const [selected,setSelected]=useState(null), [random,setRandom]=useState(-1)
  const [dragged,setDragged]=useState(false)
  return <><div className="reasons-universe">{reasons.map((reason,i)=><motion.button key={reason} className={`reason-card rc-${i%5} ${selected===i?'selected':''}`} drag dragConstraints={{left:0,right:0,top:0,bottom:0}} dragElastic={.14} onDragStart={()=>setDragged(true)} onDragEnd={()=>setTimeout(()=>setDragged(false),120)} onClick={()=>{if(!dragged)setSelected(selected===i?null:i)}} whileHover={{y:-5,rotate:(i%2?1:-1)}} whileTap={{scale:.97}}>
    <span className="reason-number">{String(i+1).padStart(2,'0')} <span>♡</span></span><span className="reason-icon">{['☀️','🦋','🐻','💌','🌷'][i%5]}</span><span className="reason-text">{reason}</span><span className="reason-extra">{selected===i ? 'And I hope you always know just how loved you are. ♡' : 'tap to unwrap a little more love'}</span>
  </motion.button>)}</div><div className="center-row"><button className="button button-outline" onClick={()=>{let options=reasons.map((_,i)=>i).filter(i=>i!==random);let next=options[Math.floor(Math.random()*options.length)];setRandom(next);setSelected(next)}}>Surprise me ✨</button></div>{random>=0&&<p className="random-reason" aria-live="polite">♡ {reasons[random]}</p>}</>
}

function Poems() {
 const [index,setIndex]=useState(()=>{try{return Math.min(Number(sessionStorage.getItem('mottoo-poem')||0),poems.length-1)}catch{return 0}}), [bloom,setBloom]=useState(false), poem=poems[index]
 useEffect(()=>{try{sessionStorage.setItem('mottoo-poem',String(index))}catch{}},[index])
 const next=step=>{setIndex((index+step+poems.length)%poems.length);setBloom(false)}
 return <div className="poem-book"><button className="page-arrow prev" aria-label="Previous poem" onClick={()=>next(-1)}>‹</button><AnimatePresence mode="wait"><motion.article className="poem-page" key={poem.title} drag="x" dragConstraints={{left:0,right:0}} onDragEnd={(_,info)=>{if(info.offset.x < -65)next(1);if(info.offset.x>65)next(-1)}} initial={{opacity:0,rotateY:-9,x:14}} animate={{opacity:1,rotateY:0,x:0}} exit={{opacity:0,rotateY:9,x:-14}} transition={{duration:.35}}><button className={`poem-flower ${bloom?'bloomed':''}`} aria-label="Make the flower bloom" onClick={()=>setBloom(!bloom)}>✿</button><p className="eyebrow">A few words, just for you</p><h3>{poem.title}</h3><p className="poem-lines">{poem.lines}</p><span className="poem-heart">♡</span></motion.article></AnimatePresence><button className="page-arrow next" aria-label="Next poem" onClick={()=>next(1)}>›</button><button className="button button-outline next-poem" onClick={()=>next(1)}>Next poem <span>→</span></button></div>
}

function Letters() {
 const [opened,setOpened]=useState(null)
 const [saved,setSaved]=useState(()=>{try{return JSON.parse(sessionStorage.getItem('mottoo-saved-letters')||'[]')}catch{return []}})
 const toggleSaved=i=>setSaved(prev=>{const next=prev.includes(i)?prev.filter(x=>x!==i):[...prev,i];try{sessionStorage.setItem('mottoo-saved-letters',JSON.stringify(next))}catch{}return next})
 return <div className="envelope-grid">{letters.map((letter,i)=><article className={`envelope ${opened===i?'opened':''}`} key={letter.title}>
  <button className="envelope-front" onClick={()=>setOpened(opened===i?null:i)} aria-expanded={opened===i}><span className="envelope-icon">{letter.icon}</span><span>{letter.title}</span><span className="envelope-seal">♥</span></button>
  <AnimatePresence>{opened===i&&<motion.div className="envelope-letter" initial={{opacity:0,height:0,y:10}} animate={{opacity:1,height:'auto',y:0}} exit={{opacity:0,height:0,y:10}}><p>{letter.text}</p><button className="close-letter" onClick={()=>toggleSaved(i)}>{saved.includes(i)?'♥ Kept close':'♡ Keep this letter close'}</button><button className="close-letter" onClick={()=>setOpened(null)}>Fold this letter ✕</button></motion.div>}</AnimatePresence>
 </article>)}</div>
}

function PromiseCard() {
 const [page,setPage]=useState(-1)
 return <div className="promise-paper"><div className="paper-tape">♡ from my heart ♡</div><h3>Promises, From My Heart to Yours</h3>{page<0?<div className="promise-cover"><p>Nine little promises, written with care.</p><button className="button button-outline" onClick={()=>setPage(0)}>Open the journal <span>↗</span></button></div>:page<promises.length?<div className="promise-page"><span className="promise-page-count">PROMISE {page+1} OF {promises.length}</span><motion.p key={page} initial={{opacity:0,x:14,rotateY:-8}} animate={{opacity:1,x:0,rotateY:0}}><span>♡</span>{promises[page]}</motion.p><div className="promise-controls"><button className="button button-outline" onClick={()=>setPage(Math.max(0,page-1))} disabled={page===0}>← Previous</button><button className="button button-outline" onClick={()=>setPage(page+1)}>Next promise →</button></div></div>:<div className="promise-page"><span className="promise-page-count">THE LAST PAGE</span><p className="promise-ending">Main tumse perfect hone ka promise nahi karta, meri jaan. Bas har din tumhare liye thoda aur behtar banne ki koshish karne ka promise karta hoon.</p><button className="button button-outline" onClick={()=>setPage(0)}>Read again ↺</button></div>}</div>
}

function SecretLetter() {
 const [open,setOpen]=useState(false), [heart,setHeart]=useState(false)
 return <div className={`secret-wrap ${open?'secret-open':''}`}><button className="secret-seal" onClick={()=>setOpen(!open)} aria-expanded={open}><span>For your eyes, and your heart.</span><b>♥</b>{!open&&<small>Tap to open</small>}</button>{open&&<motion.article className="secret-paper" initial={{opacity:0,y:24,scale:.96}} animate={{opacity:1,y:0,scale:1}} transition={{duration:.75}}><p className="secret-to">Mottoo,</p><p>Pata hai, is page ko koi title nahi diya… kyunki mujhe samajh hi nahi aaya ki is feeling ko kya naam doon.</p><p>Tumhare liye jo feel karta hoon na, woh sirf kuch cute words mein explain nahi kar sakta. Kabhi tumhari ek chhoti si baat mere face par smile le aati hai, kabhi tumhari yaad bina kisi reason ke aa jaati hai, aur kabhi bas mann karta hai ki tum mere paas hoti aur main tumhe sab kuch batata rehta.</p><p>Mujhe nahi pata future mein humari kitni memories banengi. Par main itna zaroor jaanta hoon ki tum meri story ka ek bahut hi special part ho.</p><p>Tumhe har din special feel karana shayad main hamesha perfectly na kar paaun, par main chahta hoon ki tum mere saath apni feelings share karne mein comfortable raho, apni khushi freely express karo, aur kabhi yeh na bhoolo ki tum apne aap mein kitni precious ho.</p><p>Aur agar kabhi tum mujhse poochho ki tum mere liye kya ho…<br/>Toh shayad mere paas koi perfect answer nahi hoga.</p><p className="secret-emphasis">Tum woh ho jiske liye mere paas hazaar baatein hain, par jab dil ki baat kehne ki baari aati hai, toh lafz kam pad jaate hain.</p><p>Happy Birthday, meri Mottoo. ❤️</p><p className="signature">Forever your boy, with all my love.</p><button className="letter-heart" aria-label="Reveal one more little thought" onClick={()=>setHeart(!heart)}>♥</button>{heart&&<p className="heart-secret">Some feelings don't need a title. They just need someone who understands them.</p>}</motion.article>}</div>
}

function Cake({onLight,onDone}) {
 const [phase,setPhase]=useState('ready')
 const scene=useRef(null)
 useEffect(()=>{
   if(phase!=='lighting'||window.matchMedia('(prefers-reduced-motion: reduce)').matches){if(phase==='lighting')setPhase('lit');return}
   const ctx=gsap.context(()=>{gsap.timeline({onComplete:()=>setPhase('lit')}).fromTo('.candle-0 b',{opacity:0,scale:.2,y:8},{opacity:1,scale:1,y:0,duration:.3,ease:'back.out(2)'}).fromTo('.candle-1 b',{opacity:0,scale:.2,y:8},{opacity:1,scale:1,y:0,duration:.3,ease:'back.out(2)'},'>-.03').fromTo('.candle-2 b',{opacity:0,scale:.2,y:8},{opacity:1,scale:1,y:0,duration:.3,ease:'back.out(2)'},'>-.03')},scene)
   return()=>ctx.revert()
 },[phase])
 const blow=()=>{if(phase==='ready'){setPhase('lighting');onLight();return}if(phase==='lit'){setPhase('out');onDone()}}
 return <div ref={scene} className={`cake-scene cake-${phase}`}><div className="cake-sparkles">✦　·　♡　✧　♡　·　✦</div><button className="cake" aria-label={phase==='out'?'Candles are out':'Tap the cake to light the candles'} onClick={blow}><span className="candles">{[0,1,2].map(i=><i className={`candle candle-${i} ${phase==='out'?'out':''}`} key={i}><b/></i>)}</span><span className="icing"/><span className="cake-top"/><span className="cake-bottom"/><span className="cake-plate"/></button><p>{phase==='ready'?'Tap the cake to light the candles':phase==='lit'||phase==='lighting'?'Your wish is ready. Tap again to blow them out!':'Make a wish, Mottoo. ✨'}</p><button className="button button-outline" onClick={blow} disabled={phase==='out'||phase==='lighting'}>{phase==='ready'?'Light the candles ✨':phase==='lit'?'Blow out the candles 💨':phase==='lighting'?'Lighting the candles…':'Wish made ♡'}</button></div>
}

export default function App() {
 const [opening,setOpening]=useState(true), [active,setActive]=useState('welcome'), [menu,setMenu]=useState(false), [blown,setBlown]=useState(false), [scroll,setScroll]=useState(0), [lastSurprise,setLastSurprise]=useState(false)
 const [foundHearts,setFoundHearts]=useState(()=>{try{return JSON.parse(sessionStorage.getItem('mottoo-heart-hunt')||'[]')}catch{return []}})
 const findHeart=i=>setFoundHearts(old=>{if(old.includes(i))return old;const next=[...old,i];try{sessionStorage.setItem('mottoo-heart-hunt',JSON.stringify(next))}catch{}return next})
 const reduceMotion=useReducedMotion()
 useEffect(()=>{const onScroll=()=>{const max=document.documentElement.scrollHeight-innerHeight;setScroll(max>0?scrollY/max:0);let found='welcome';for(const [id] of nav){const el=document.getElementById(id);if(el&&el.getBoundingClientRect().top<innerHeight*.42)found=id}setActive(found)};window.addEventListener('scroll',onScroll,{passive:true});onScroll();return()=>window.removeEventListener('scroll',onScroll)},[])
 const enter=()=>{setOpening(false);setTimeout(()=>smooth('welcome'),reduceMotion?0:400)}
 const replay=()=>{window.scrollTo({top:0,behavior:'smooth'});setOpening(true)}
 return <>
  <AnimatePresence>{opening&&<Opening key="opening" onOpen={enter} onSkip={enter}/>}</AnimatePresence>
  <div className="progress-track"><span style={{transform:`scaleX(${scroll})`}}/></div>
  <header className="site-nav"><a className="brand" href="#welcome" onClick={e=>{e.preventDefault();smooth('welcome')}}><span>♡</span> mottoo's universe</a><button className="menu-toggle" onClick={()=>setMenu(!menu)} aria-label={menu?'Close navigation':'Open navigation'}>{menu?<X/>:<Menu/>}</button><nav className={menu?'nav-links show':'nav-links'} aria-label="Story chapters">{nav.map(([id,label])=><a key={id} className={active===id?'active':''} href={`#${id}`} onClick={e=>{e.preventDefault();setMenu(false);smooth(id)}}>{label}{active===id&&<span className="nav-dot">♥</span>}</a>)}</nav></header>
  <main>
   <Section id="welcome" className="hero chapter-pink" label="Grand welcome"><img className="hero-generated-clouds" src={`${import.meta.env.BASE_URL}generated/pastel-clouds.svg`} alt="" aria-hidden="true"/><HiddenHeart index={1} found={foundHearts.includes(1)} onFind={()=>findHeart(1)}/><div className="hero-cloud cloud-left"/><div className="hero-cloud cloud-right"/><span className="hero-doodle doodle-one">♡</span><span className="hero-doodle doodle-two">✿</span><div className="hero-inner"><div className="hero-copy"><p className="eyebrow">A tiny universe, just for you <span>✦</span></p><h1>Happy Birthday,<br/><em>My Mottoo</em></h1><p className="hero-subtitle">Today, this little universe revolves around you. 💗</p><button className="button button-primary" onClick={()=>smooth('gift')}>Start our little adventure <span>↓</span></button><p className="hero-hint">Psst… tap around. There are surprises waiting.</p><HeroSecretHeart/></div><div className="hero-visual"><div className="hero-orbit orbit-one"/><div className="hero-orbit orbit-two"/><img className="hero-generated-bears" src={`${import.meta.env.BASE_URL}generated/bear-doodles.svg`} alt="" aria-hidden="true"/><BearPair/><span className="hero-sticker sticker-one">made with<br/>♡ for you</span><span className="hero-sticker sticker-two">my favourite<br/>person ✿</span></div></div><a className="scroll-cue" href="#gift" onClick={e=>{e.preventDefault();smooth('gift')}}>scroll to unwrap <span>↓</span></a></Section>
   <Section id="gift" className="chapter-yellow" label="A tiny birthday surprise"><div className="section-heading"><p className="eyebrow">A little present, wrapped in love</p><h2>Something <em>for you</em></h2><p>Go on, there's a tiny surprise with your name on it.</p></div><Gift/></Section>
   <Section id="game" className="chapter-catcher" label="Catch a heart to win a birthday gift"><div className="section-heading"><p className="eyebrow">A little birthday game</p><h2>Catch My <em>Heart</em></h2><p>There’s a tiny gift waiting if you can catch seven.</p></div><HeartCatcher/></Section>
   <Section id="reasons" className="chapter-reasons" label="A hundred little reasons"><img className="reasons-flower-doodles" src={`${import.meta.env.BASE_URL}generated/flower-doodles.svg`} alt="" aria-hidden="true"/><HiddenHeart index={2} found={foundHearts.includes(2)} onFind={()=>findHeart(2)}/><div className="section-heading"><p className="eyebrow">A small list that could go on forever</p><h2>A Hundred <em>Little Reasons</em></h2><p>Drag a note a little, or tap to find the message underneath.</p></div><Reasons/></Section>
   <Section id="poetry" className="chapter-poetry" label="Shayari, sirf tumhare naam"><HiddenHeart index={3} found={foundHearts.includes(3)} onFind={()=>findHeart(3)}/><div className="section-heading"><p className="eyebrow">A little poetry journal</p><h2>Shayari, <em>sirf tumhare naam</em></h2></div><Poems/></Section>
   <Section id="letters" className="chapter-letters" label="Open when letters"><HiddenHeart index={4} found={foundHearts.includes(4)} onFind={()=>findHeart(4)}/><div className="section-heading"><p className="eyebrow">Little notes for all kinds of days</p><h2>Open <em>when…</em></h2><p>Pick an envelope. I'm right here in every one.</p></div><Letters/></Section>
   <Section id="promises" className="chapter-promises" label="My promises to you"><div className="section-heading"><p className="eyebrow">The soft, sincere kind</p><h2>My promises, <em>to you</em></h2></div><PromiseCard/></Section>
   <Section id="letter" className="chapter-secret" label="A letter for your eyes and your heart"><div className="secret-intro"><span className="eyebrow">A quiet little moment</span><p>Some things are easier to write down.</p></div><SecretLetter/></Section>
   <Section id="hug" className="chapter-hug" label="The little hug machine"><div className="section-heading"><p className="eyebrow">A hug, whenever you need one</p><h2>The Little <em>Hug Machine</em></h2></div><HugMachine/></Section>
   <Section id="universe" className="chapter-universe" label="The interactive heart universe"><div className="section-heading"><p className="eyebrow">A tiny constellation made for you</p><h2>Our little <em>heart universe</em></h2><p>Every point holds a small thought I wanted you to keep.</p></div><ConnectedHeart interactive/></Section>
   <Section id="finale" className={`chapter-finale ${blown?'celebrating':''}`} label="The final birthday surprise"><HiddenHeart index={5} found={foundHearts.includes(5)} onFind={()=>findHeart(5)}/><div className="finale-stars">✦　♡　✧　·　♡　✦　✧　♡</div><div className="section-heading"><p className="eyebrow">And now, the biggest wish of all</p><h2>Happy Birthday,<br/><em>My Mottoo!</em> 🎂💗</h2></div><Cake onLight={()=>setBlown(false)} onDone={()=>setBlown(true)}/><div className={`final-message ${blown?'show':''}`}><p>Meri jaan, I hope this new year of your life brings you happiness, confidence, beautiful opportunities, and countless reasons to smile.</p><p>I hope you keep discovering things you love, chasing the dreams that matter to you, and becoming the person you want to be.</p><p>Thank you for being a part of my life and for giving me so many little moments to cherish.</p><p>Main chahta hoon ki hum ek-doosre ko samajhte rahein, saath grow karein, silly baaton par haste rahein, aur life ki beautiful cheezein saath discover karein.</p><p>Aaj ka din tumhara hai. Khush rehna, smile karna, aur khud ko bhi utna hi pyaar dena jitna tum deserve karti ho.</p><p>Happy Birthday, Mottoo. I love you. ❤️🧸</p></div><div className="final-actions"><button className="button button-primary" onClick={()=>smooth('letter')}>Read my letter again <span>↑</span></button><button className="button button-outline" onClick={replay}>Restart our little universe <span>↺</span></button><button className="text-link" onClick={()=>setLastSurprise(!lastSurprise)}>One last surprise ✨</button>{lastSurprise&&<motion.div className="last-surprise" initial={{opacity:0,scale:.8}} animate={{opacity:1,scale:1}}><ConnectedHeart/>Of all the little things in this universe, you’re my favourite. 💗</motion.div>}</div><footer>Made with a whole lot of love <span>♥</span> for Mottoo · 16 October 2026</footer></Section>
  </main>
  <div className="hunt-status" aria-live="polite">♡ {foundHearts.length}/5 little hearts found{foundHearts.length===5&&<strong> Secret unlocked: you make my whole world softer. 💗</strong>}</div><AffectionButton/>
  <button className="back-top" aria-label="Back to top" onClick={()=>smooth('welcome')}><ArrowUp size={18}/></button>
 </>
}

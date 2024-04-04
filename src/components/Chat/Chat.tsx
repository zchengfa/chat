import './chat.sass'
import {chatData, emoji, EmojiType} from "../../common/staticData/data";
import {useChatStore} from "../../zustand/store";
import {useRef,useEffect,useState} from "react";

export default function Chat (props:any){
  const {isShowRightKeyboard,isShowLeftKeyboard,changeKeyboardStatus,isShowAddBox,changeAddBoxStatus,isShowInput,changeInputStatus} = useChatStore((state:any)=> state)
  const inputRef:any = useRef(null)
  const [isShowSendBtn,setSendBtn] = useState(false)

  const focusInput = ()=>{
    // @ts-ignore
    document.getElementsByClassName('chat-input').item(0).focus()
  }
  const leftClick = ()=>{
    changeKeyboardStatus(!isShowLeftKeyboard,0)
    changeAddBoxStatus(false)
    if(isShowRightKeyboard){
      changeKeyboardStatus(false,1)
    }
    changeInputStatus(isShowLeftKeyboard)
    if(isShowLeftKeyboard){
      let timer = setTimeout(()=>{
        focusInput()
        clearTimeout(timer)
      })
    }
  }

  const rightClick = ()=>{
    changeKeyboardStatus(!isShowRightKeyboard,1)
    changeAddBoxStatus(false)
    if(isShowLeftKeyboard){
      changeKeyboardStatus(false,0)
    }
    if(!isShowInput){
      changeInputStatus(true)
    }
    if(isShowRightKeyboard){
      focusInput()
    }
  }

  const showAddBox = ()=>{
    changeKeyboardStatus(false,0)
    changeKeyboardStatus(false,1)
    changeInputStatus(true)
    changeAddBoxStatus(!isShowAddBox)
  }

  const chooseEmoji = (e:any,item:EmojiType)=>{
    document.dispatchEvent(new CustomEvent('chooseEmoji', {
      'detail': {
        ...item
      }
    }))
    focusInput()
    setSendBtn(true)
  }

  const clearStatus = ()=>{
    changeKeyboardStatus(false,0)
    changeKeyboardStatus(false,1)
    changeAddBoxStatus(false)
  }

  const keyDownEvent = (e:any)=>{
    props.keyDownEvent(e)
  }
  const changeEvent = (e:any)=>{
    props.changeEvent(e);
    if((inputRef.current.value).trim().length > 0){
      setSendBtn(true)
    }
    else{
      setSendBtn(false)
    }
  }

  const sendClick = ()=>{
    props.onSend()
    setSendBtn(false)
  }

  const addItemClick = (item:any,index:number)=>{
    props.addItemClick(item,index)
  }

  const audioEvent = ()=>{
    props.audioEvent()
  }

  useEffect(()=>{
    inputRef?.current?.addEventListener('focus',()=>{
      clearStatus()
    })
    return ()=>{
      // eslint-disable-next-line react-hooks/exhaustive-deps
      inputRef?.current?.removeEventListener('focus',clearStatus)
    }
  },[])

  return <div className={'chat-container'}>
    <div className={'chat-top-box container-item'}>
      <div className={'chat-left chat-item'} onClick={leftClick}>
        {isShowLeftKeyboard ? chatData['keyboardIcon'] : chatData['audioIcon']}
      </div>
      <div className={'chat-center chat-item'}>
        <input value={props.msg} onKeyDown={(event)=>keyDownEvent(event)} onChange={(event)=> changeEvent(event)} ref={inputRef} className={isShowInput ? 'chat-input' : 'hidde-element'} type="text"/>
        <div onClick={audioEvent} className={isShowInput ? 'hidde-element' :'audio-box'}><span>按住</span><span>说话</span></div>
      </div>
      <div className={'chat-right chat-item'}>
        <div className={'keyboard-emoji'} onClick={rightClick}>
          {isShowRightKeyboard ? chatData['keyboardIcon'] : chatData['emojiIcon']}
        </div>
        <div className={isShowSendBtn ? 'hidde-element' : 'add'} onClick={showAddBox}>
          {chatData['addIcon']}
        </div>
        <div className={isShowSendBtn ? 'send-visible send' : 'send-hidde send'} onClick={sendClick}>
          发送
        </div>
      </div>
    </div>
    <div
      className={isShowRightKeyboard ? 'chat-bottom-box container-item bottom-box-up' : isShowAddBox ? 'bottom-box-up-add chat-bottom-box container-item' : 'chat-bottom-box container-item'}>
      {
        isShowRightKeyboard ? <div className={'emoji-container'}>
          <span className={'emoji-title'}>所有表情</span>
          <div className={'emoji-box'}>
            {
              emoji.map((item: EmojiType, index: number) => {
                return <div className={'emoji-item'} key={index}
                            onClick={(event) => chooseEmoji(event, item)}>
                  <span className={'emoji'}>{item.emoji}</span>
                </div>
              })
            }
            <div className={'emoji-item'}></div>
          </div>
        </div> : null
      }
      {
        isShowAddBox ? <div className={'add-container'}>
          {
            chatData?.addIcons.map((item:{title:string,icon:any},index:number)=>{
              return <div className={'add-item'} key={index} onClick={()=> addItemClick(item,index)}>
                {item.icon}
                <span className={'add-title'}>{item.title}</span>
              </div>
            })
          }
        </div> : null
      }
    </div>
  </div>
}
import './emoji.sass'
import {Popover} from "antd";
import {emoji, EmojiType} from "../../../common/staticData/data";
import {useMessageStore} from "../../../zustand/store";

export default function Emoji(props: any) {
  const {children} = props

  const chooseEmoji = (e: any, item: EmojiType) => {
    document.dispatchEvent(new CustomEvent('chooseEmoji', {
      'detail': {
        ...item
      }
    }))
  }

  const emojiStatus = useMessageStore((state: any) => state.emojiStatus)
  const content = (
    <div className={'pop-container'}>
      <p className={'title-emoji'}>全部表情</p>
      <div className={'emoji-popover'}>
        {
          emoji.map((item: EmojiType, index: number) => {
            return <div title={item.title} className={'emoji-tip'} key={index}
                      onClick={(event) => chooseEmoji(event, item)}>
              <span className={'emoji'}>{item.emoji}</span>
            </div>
          })
        }
      </div>
    </div>
  )

  return <Popover trigger={'click'} content={content} open={emojiStatus}>
    {children}
  </Popover>
}
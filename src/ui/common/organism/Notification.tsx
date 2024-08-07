import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'

function App() {
  return (
    <Picker data={data} onEmojiSelect={console.log} />
  )
}
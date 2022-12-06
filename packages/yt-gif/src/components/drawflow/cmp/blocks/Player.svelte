<script>
	import Editor from '$cmp/text-editor/svnotion/editor/index.svelte'
</script>

<div>
	<Editor content={{ type: 'doc', content: [{ type: 'paragraph' }] }} />
</div>

<style lang="sass">


* , *:before, *:after
  box-sizing: border-box
  

  
.music-player 
  position: relative
  width: 350px
  height: 290px
  margin: .5em
  box-shadow: 0 0 60px rgba(0,0,0,0.8)
  border-radius: 10px
  background: #222
  overflow: hidden
  z-index: 0
  
  
  .info
    width: 100%
    height: 100px
    background: #222
    background: rgba(0,0,0,0.8)
    text-align: center
    position: relative

    
    .left , .right
      width: 25px
      position: absolute
      top: 30px
      left: 30px
    .right
      left: auto
      right: 30px
      
    [class^="icon-"]
      margin: 0 0 10px

    .center
      padding: 20px 0 0
    
  .progress , .volume-level
    width: 100%
    height: 5px
    display: block
    background: #000
    position: absolute
    bottom: 0px
    cursor: pointer
    border: none

    
    
  .controls
    text-align: center
    width: 100%
    height: 190px
    background: #982e4b
    background: rgba(152, 46, 75, 0.6)
    .current
      font-size: 48px
      color: #fff
      color: rgba(225, 225, 225, 0.4)
      padding: 15px 0 20px

    .play-controls
      a
        display: inline-block
        width: 35px
        height: 40px
        margin: 0 30px

    .volume-level
      position: relative
      bottom: auto
      width: 200px
      height: 2px
      margin: 30px auto 0
      background: rgba(225, 225, 225, 0.3)

      .icon-volume-up , .icon-volume-down
        position: absolute
        right: -34px  
        top: -8px
        width: 22px
      .icon-volume-down
        right: auto
        left: -27px

   
[class^="icon-"]
  width: 18px
  height: 18px
  background: url("//i.imgur.com/E09T8tf.png") no-repeat center
  display: block

.icon
  &-shuffle
    background-image: url("//i.imgur.com/AQAxRxS.png")
  &-heart
    background-image: url("//i.imgur.com/E09T8tf.png")
  &-repeat
    background-image: url("//i.imgur.com/338F8MX.png")
  &-share
    background-image: url("//i.imgur.com/PGIC6ME.png")
  &-previous
    background-image: url("//i.imgur.com/LIqj0nr.png")
  &-play
    background-image: url("//i.imgur.com/xlBv5aR.png")
  &-pause 
    background-image: url("//i.imgur.com/lIhwduj.png")
  &-next
    background-image: url("//i.imgur.com/Mb6Nzj5.png")
  &-volume-up
    background-image: url("//i.imgur.com/qqdoddi.png")
  &-volume-down
    background-image: url("//i.imgur.com/3iirf2f.png")


</style>

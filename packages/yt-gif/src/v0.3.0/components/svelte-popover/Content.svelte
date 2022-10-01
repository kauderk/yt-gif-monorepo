<!-- prettier-ignore-->
<script lang="ts">
  import Arrow from '$v3/components/BlueprintJS/Arrow.svelte';

  export let offset={
    bottom:{
      center:{
        x: 2
      }
    }
  }
  export let type:s;
  export let targetRef:HTMLElement;
  export let zIndex:n;

  export let arrow:b;
  export let placement:s;

  import { onMount, createEventDispatcher, tick } from 'svelte';

  let contentRef:HTMLDivElement;
  let arrowRef:HTMLElement;
  
  type f=s|null
  type TP={
    top: f;
    left: f;
  }
  $: positionStyle =(<TP>{})
  type TA={
    transform: string;
    top: f;
    left: f;
    right: f;
}
  $: arrowStyleProps=(<TA>{})

  const dispatch = createEventDispatcher();

  const calculate = () => {
    const targetBound = targetRef.getBoundingClientRect();
    const contentBound = contentRef.getBoundingClientRect();

    let arrowBound = { width: 0, height: 0 };
    if (arrow) {
      arrowBound = arrowRef.getBoundingClientRect();
    }

    const { innerWidth, innerHeight } = window;

    const calcCoverLeft = contentBound.x - contentBound.width;
    const coverLeft = calcCoverLeft < 0 ? calcCoverLeft : 0;

    const calcCoverRight = contentBound.x + targetBound.width + contentBound.width;
    const coverRight = calcCoverRight > innerWidth ? innerWidth - calcCoverRight : 0;

    const calcCoverTop = contentBound.y - contentBound.height;
    const coverTop = calcCoverTop < 0 ? calcCoverTop : 0;

    const calcCoverBottom = targetBound.bottom + contentBound.height;
    const coverBottom = calcCoverBottom > innerHeight ? innerHeight - calcCoverBottom : 0;

    const calcXCenterLeft = contentBound.x + targetBound.width / 2 - contentBound.width / 2;

    const calcXCenterRight = contentBound.x + targetBound.width / 2 - contentBound.width / 2 + contentBound.width;

    const coverXCenterLeft = calcXCenterLeft < 0 ? calcXCenterLeft : 0;

    const coverXCenterRight = calcXCenterRight > innerWidth ? innerWidth - calcXCenterRight : 0;

    const calcYCenterTop = contentBound.y + targetBound.height / 2 - contentBound.height / 2;

    const coverYCenterTop = calcYCenterTop < 0 ? calcYCenterTop : 0;

    const calcYCenterBottom = contentBound.y + targetBound.height / 2 - contentBound.height / 2 + contentBound.height;

    const coverYCenterBottom = calcYCenterBottom > innerHeight ? calcYCenterBottom : 0;

    const calcTopStart = contentBound.x + contentBound.width;
    const coverTopStart = calcTopStart > innerWidth ? innerWidth - calcTopStart : 0;

    const calcTopEnd = contentBound.x - (contentBound.width - targetBound.width);
    const coverTopEnd = calcTopEnd < 0 ? calcTopEnd : 0;

    const calcLeftEndTop = contentBound.y - (contentBound.height - targetBound.height);
    const coverLeftEndTop = calcLeftEndTop < 0 ? calcLeftEndTop : 0;

    const coverRightEndTop = coverLeftEndTop;

    const calcLefStartBottom = contentBound.y + contentBound.height;
    const coverLeftStartBottom = calcLefStartBottom > innerHeight ? innerHeight - calcLefStartBottom : 0;

    const coverRightStartBottom = coverLeftStartBottom;

    const coverBottomStartRight = coverTopStart;
    const coverBottomEndLeft = coverTopEnd;

    const xCenterStyle = (targetBound.height / 2 - contentBound.height / 2) + targetBound.top;
    const rightLeftEnd = -(contentBound.height - targetBound.height);
    const topBottomEnd = -(contentBound.width - targetBound.width) + targetBound.left;
    
    // prevent X overflow
    const calcTopBottomCenter = (targetBound.left + targetBound.width / offset.bottom.center.x) - contentBound.width / 2;
    const leftRopBottomCenter = calcTopBottomCenter < 0 ? 0 : calcTopBottomCenter;
    const topBottomCenter = targetBound.left+contentBound.width/2> innerWidth ? innerWidth-contentBound.width : leftRopBottomCenter;

    const computeArrowW = arrowBound.width / 2;
    const computearrowH = arrowBound.height / 2;

    const leftLeftStyle = -(contentBound.width + computeArrowW) + targetBound.left;
    const topTopStyle = (contentBound.height + arrowBound.height / 2);
    const rightLeftStyle = targetBound.width + computeArrowW + targetBound.left;
    const bottomTopStyle = targetBound.height + computearrowH + targetBound.top;

    const CTL=(top:n|null,left?:n)=>({top:top ? top+'px':null, left:left ? left+'px':null})
    const styles = {
      topStart: CTL(topTopStyle),
      topCenter: CTL(topTopStyle ,topBottomCenter),
      topEnd: CTL(topTopStyle ,topBottomEnd),

      leftStart: CTL(null,leftLeftStyle),
      leftCenter: CTL(xCenterStyle,leftLeftStyle),
      leftEnd: CTL(rightLeftEnd,leftLeftStyle),

      rightStart: CTL(null,rightLeftStyle),
      rightCenter: CTL(xCenterStyle,rightLeftStyle),
      rightEnd: CTL(rightLeftEnd,rightLeftStyle),

      bottomStart: CTL(bottomTopStyle),
      bottomCenter: CTL(bottomTopStyle ,topBottomCenter),
      bottomEnd: CTL(bottomTopStyle ,topBottomEnd),
    };

    const arrowBottomTransform = `transform:rotate(-45deg)`;
    const arrowTopTransform = `transform: rotate(135deg)`;
    const arrowLeftTransform = `transform: rotate(45deg)`;
    const arrowRightTransform = `transform:rotate(45deg)`;

    const arrowBottomTop = Math.ceil(-arrowBound.height / 2) + bottomTopStyle

    const arrowBottomTopCenter = contentBound.width / 2 - arrowBound.width / 3.75 +calcTopBottomCenter

    const arrowTop = contentBound.height - arrowBound.height / 2
    const arrowTopBottomEnd = targetBound.width / 2 - arrowBound.width / 2;

    const arrowLeftRightEnd = contentBound.height - arrowBound.height / 2 - targetBound.height / 2;

    const arrowLeftRightCenter = contentBound.height / 2 - Math.ceil(arrowBound.height / 2);
    const arrowTopBottomStartLeft = targetBound.width / 2 - arrowBound.width / 2;

    const arrowLeftLeft = Math.ceil(contentBound.width - arrowBound.width / 2);
    const arrowLeftRightTop = targetBound.height / 2 - arrowBound.height / 2;

    const TTL=(transform:s,top:n,left:n|null,right?:n)=>(
    {
      transform,
      top:top ? top+'px':null,
      left:left ? left+'px':null,
      right:right ? right+'px':null
    })
    
    const arrowStyle = {
      topStart: TTL(arrowTopTransform, arrowTop,arrowTopBottomStartLeft)
      ,topCenter: TTL(arrowTopTransform, arrowTop,arrowBottomTopCenter)
      ,topEnd: TTL(arrowTopTransform,arrowTop,null,arrowTopBottomEnd)

      ,leftStart: TTL(arrowLeftTransform,arrowLeftRightTop, arrowLeftLeft,)

      ,leftCenter: TTL(arrowLeftTransform,arrowLeftRightCenter, arrowLeftLeft,)

      ,leftEnd: TTL(arrowLeftTransform,arrowLeftRightEnd, arrowLeftLeft,)

      ,rightStart: TTL(arrowRightTransform,arrowLeftRightTop, -arrowBound.width)

      ,rightCenter: TTL(arrowRightTransform,arrowLeftRightCenter, -arrowBound.width)

      ,rightEnd: TTL(arrowRightTransform,arrowLeftRightEnd, -arrowBound.width)

      ,bottomStart: TTL(arrowBottomTransform, arrowBottomTop,arrowTopBottomStartLeft)
      ,bottomCenter: TTL(arrowBottomTransform, arrowBottomTop,arrowBottomTopCenter)
      ,bottomEnd: TTL(arrowBottomTransform,arrowBottomTop,null,arrowTopBottomEnd)
    };

    const pos = [
      {
        at: 'top-start',
        cover: [coverTop, coverTopStart, 0],
        style: styles.topStart,
        arrow: arrowStyle.topStart,
      },
      {
        at: 'top-center',
        cover: [coverTop, coverXCenterLeft, coverXCenterRight],
        style: styles.topCenter,
        arrow: arrowStyle.topCenter,
      },
      {
        at: 'top-end',
        cover: [coverTop, coverTopEnd, 0],
        style: styles.topEnd,
        arrow: arrowStyle.topEnd,
      },
      {
        at: 'left-start',
        cover: [coverLeft, coverLeftStartBottom, 0],
        style: styles.leftStart,
        arrow: arrowStyle.leftStart,
      },
      {
        at: 'left-center',
        cover: [coverLeft, coverYCenterTop, coverYCenterBottom],
        style: styles.leftCenter,
        arrow: arrowStyle.leftCenter,
      },
      {
        at: 'left-end',
        cover: [coverLeft, coverLeftEndTop, 0],
        style: styles.leftEnd,
        arrow: arrowStyle.leftEnd,
      },
      {
        at: 'right-start',
        cover: [coverRight, coverRightStartBottom, 0],
        style: styles.rightStart,
        arrow: arrowStyle.rightStart,
      },
      {
        at: 'right-center',
        cover: [coverRight, coverYCenterTop, coverYCenterBottom],
        style: styles.rightCenter,
        arrow: arrowStyle.rightCenter,
      },
      {
        at: 'right-end',
        cover: [coverRight, coverRightEndTop, 0],
        style: styles.rightEnd,
        arrow: arrowStyle.rightEnd,
      },
      {
        at: 'bottom-start',
        cover: [coverBottom, coverBottomStartRight, 0],
        style: styles.bottomStart,
        arrow: arrowStyle.bottomStart,
      },
      {
        at: 'bottom-center',
        cover: [coverBottom, coverXCenterLeft, coverXCenterRight],
        style: styles.bottomCenter,
        arrow: arrowStyle.bottomCenter,
      },
      {
        at: 'bottom-end',
        cover: [coverBottom, coverBottomEndLeft, 0],
        style: styles.bottomEnd,
        arrow: arrowStyle.bottomEnd,
      },
    ];

    let get;

    if (placement === 'auto') {
      const reducer = (acc:n,crr:n) => acc + crr;

      const compute = pos.map(({ cover }) => cover.reduce(reducer));
      const findIndex = compute.indexOf(Math.max(...compute));
      const result = pos[findIndex];
      get = result;
    } else {
      get = pos.filter(val => val.at === placement)[0];
    }
    const debug = pos.map(val => val.cover);

    positionStyle = get.style;
    arrowStyleProps = get.arrow;
  };
  const tryCalculate=()=>{
    if (!!contentRef && !!arrowRef || !hidden) {
      calculate();
    }
  }
  onMount(() => {
    calculate();

    dispatch('open');
  });
  export let hidden:b
  $: if(!hidden){
    (async function() {
      await tick()
      tryCalculate()
    })();
  }
  export function clickOutside(node:HTMLElement) {
    // https://svelte.dev/tutorial/actions
    const handleClick = (event:any) => {
      if (!node.contains(event.target)) {
        node.dispatchEvent(new CustomEvent("outclick"));
      }
    };

    document.addEventListener("click", handleClick, true);

    return {
      destroy() {
        document.removeEventListener("click", handleClick, true);
      }
    };
  }
</script>

<svelte:window on:resize={tryCalculate} />
<div
	use:clickOutside
	on:outclick
	bind:this={contentRef}
	class="content content-{type}"
	style:top={positionStyle.top}
	style:left={positionStyle.left}
	style="z-index:{zIndex + 2};">
	<slot />
</div>

{#if arrow}
	<Arrow bind:arrowRef {...arrowStyleProps} />
{/if}

<style>
	.arrow {
		position: absolute;
		top: 0;
	}
	.content {
		display: inline-block;
		position: absolute;
		left: 0;
		top: 0;
	}
</style>

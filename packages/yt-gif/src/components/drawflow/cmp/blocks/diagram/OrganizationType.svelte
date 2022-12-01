<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<div class="wrapper">
	<div class="">
        <ValueEntry typeLetter="S" brackets="0" valueName="name" className="blue-type" extra={["type", "O T"]}/>
        <ValueEntry typeLetter="O" brackets="0" valueName="organization" className="green-type" extra={[]}/>
    </div>
</div>

<style lang="scss">

    .wrapper{
        width: 285px;
    }

</style>

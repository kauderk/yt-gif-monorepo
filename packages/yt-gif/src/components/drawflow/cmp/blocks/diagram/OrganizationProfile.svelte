<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<div class="wrapper">
	<div class="">
        <ValueEntry typeLetter="U" brackets="0" valueName="user" className="green-type" extra={["profile", "O P"]}/>
        <ValueEntry typeLetter="O" brackets="0" valueName="org" className="green-type" extra={[]}/>
        <ValueEntry typeLetter="O" brackets="0" valueName="type" className="green-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="code" className="blue-type" extra={[]}/>
    </div>
</div>

<style lang="scss">

    .wrapper{
        width: 245px;
    }

</style>

<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<div class="wrapper">
	<div class="">
        <ValueEntry typeLetter="S" brackets="0" valueName="id" className="blue-type" extra={["address", "A"]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="street" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="city" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="province" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="I" brackets="0" valueName="postal" className="blue-type" extra={[]}/>
    </div>
</div>

<style lang="scss">

    .wrapper{
        width: 265px;
    }

</style>

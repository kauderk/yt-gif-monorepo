<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<div class="wrapper">
	<div class="">
        <ValueEntry typeLetter="S" brackets="0" valueName="name" className="blue-type" extra={["org", "D"]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="desc" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="vat" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="C D" brackets="0" valueName="contactDetails" className="green-type" extra={[]}/>
    </div>
</div>

<style lang="scss">

    .wrapper{
        width: 280px;
    }

</style>

<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<div class="wrapper">
	<div class="">
        <ValueEntry typeLetter="S" brackets="1" valueName="email" className="blue-type" extra={["contactDetails", "C D"]}/>
        <ValueEntry typeLetter="S" brackets="1" valueName="cell" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="1" valueName="tell" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="1" valueName="fax" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="A" brackets="0" valueName="postalAddress" className="green-type" extra={[]}/>
        <ValueEntry typeLetter="A" brackets="0" valueName="physicalAddress" className="green-type" extra={[]}/>
    </div>
</div>

<style lang="scss">

    .wrapper{
        width: 415px;
    }

</style>

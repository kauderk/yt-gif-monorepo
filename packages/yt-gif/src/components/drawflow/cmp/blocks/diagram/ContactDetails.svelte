<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

<div class="wrapper">
	<div class="d-flex flex-column">
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

<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

<div class="wrapper">
	<div class="d-flex flex-column">
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

<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

<div class="wrapper">
	<div class="d-flex flex-column">
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

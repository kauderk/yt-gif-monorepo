<script>
	import ValueEntry from './ValueEntry.svelte'
</script>

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">

<div class="wrapper">
	<div class="d-flex flex-column">
        <ValueEntry typeLetter="S" brackets="0" valueName="name" className="blue-type" extra={["user", "U"]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="surname" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="S" brackets="0" valueName="middle" className="blue-type" extra={[]}/>
        <ValueEntry typeLetter="D" brackets="0" valueName="dob" className="orange-type" extra={[]}/>
        <ValueEntry typeLetter="O P" brackets="1" valueName="orgProfile" className="green-type" extra={[]}/>
        <ValueEntry typeLetter="C D" brackets="0" valueName="contactDetails" className="green-type" extra={[]}/>
    </div>
</div>

<style lang="scss">

    .wrapper{
        width: 310px;
    }

</style>

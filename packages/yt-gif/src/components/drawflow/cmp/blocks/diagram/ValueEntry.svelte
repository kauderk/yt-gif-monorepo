<script lang="ts">
    export let className: String;
    export let typeLetter: String;
	export let valueName: String;
    export let brackets: String;
    export let extra: String[];
</script>

<div class="d-flex flex-row justify-content-between">
    <div class="d-flex flex-row" >
        <div class='type {className}'>{typeLetter}</div>
        {#if brackets == "1"}
            <div class='type purple-type'>[]</div>
        {/if}
        <div class="mb-1 value">{valueName}</div>
    </div>
    {#if extra.length > 0}
        <div class="d-flex flex-row">            
            <div class="value">{extra[0]}</div>
            <div class='type green-type-2'>{extra[1]}</div>
        </div>
    {/if}
</div>

<style>    

    :root{        
        --green-type: linear-gradient(180deg, #b2f104, #6e9600);
    }

    .type{        
		color: black;
		font-weight: 550;
		padding: 0px 7px 0px 7px;
		margin: 2.5px 0px 2.5px 0;
		border-radius: 0.6em 0 0 0.6em;
        min-width: 25px;
        max-width: 50px;
        text-align: center;
    }

    .blue-type{
        background: linear-gradient(180deg, #02b8f9, #018cc7);
    }

    .orange-type{
        background: linear-gradient(180deg, #f59800, #bf7600);
    }

    .green-type{
        background: var(--green-type);
    }

    .green-type-2{
        margin-left: 10px;
        margin-right: 3px;
		border-radius: 0 0.6em 0.6em 0;
        background: var(--green-type);
    }

    .purple-type{
        background: linear-gradient(180deg, #8e03ff, #8300e4);
        color: rgb(255, 253, 147);
		border-radius: 0;
    }

    .value{
        margin-left: 10px;
    }
</style>
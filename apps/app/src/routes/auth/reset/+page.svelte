<h2>Recuperar contraseña</h2>
<br />
<div class="container2" id="container">
	<div class="form-container sign-in-container2">
		<form action="#">
			<h1>¿Problemas para iniciar sesión?</h1>
			<span
				>Introduce tu correo electrónico y te enviaremos un enlace para
				que recuperes el acceso a tu cuenta.</span>
			<input type="email" placeholder="Correo electrónico" />
			<button>Recuperar contraseña</button>
		</form>
	</div>
</div>

<style lang="scss">
	@use '../../../styles/auth/layout.css';

	.container2 {
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
			0 10px 10px rgba(0, 0, 0, 0.22);
		position: relative;
		overflow: hidden;
		width: 400px;
		max-width: 100%;
		min-height: 480px;
	}
	.sign-in-container2 {
		left: 0;
		width: 100%;
		z-index: 2;
	}
</style>

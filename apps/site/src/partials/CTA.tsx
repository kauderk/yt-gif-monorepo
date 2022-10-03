import { GradientText, Newsletter, Section } from 'astro-boilerplate-components'

const CTA = () => (
	<Section>
		<Newsletter
			title={
				<>
					Subscribete a mis <GradientText>Anuncios</GradientText>
				</>
			}
			description="Noticias del progreso y estdo de YT GIF GRAPH."
		/>
	</Section>
)

export { CTA }

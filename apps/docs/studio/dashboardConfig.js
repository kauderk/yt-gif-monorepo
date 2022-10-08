export default {
	widgets: [
		{
			name: 'project-info',
			options: {
				__experimental_before: [
					{
						name: 'netlify',
						options: {
							description:
								'NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.',
							sites: [
								{
									buildHookId: '',
									title: 'Sanity Studio',
									name: 'sanity-svelte-kit-studio-ezqhiwf7',
									apiId: 'd6667132-72ef-42a0-a244-75c40065a847',
								},
								{
									buildHookId: '',
									title: 'Blog Website',
									name: 'sanity-svelte-kit-web-5habpmb6',
									apiId: 'fd4349e1-77a7-426d-8ce9-ddc855b5c4d8',
								},
							],
						},
						layout: { height: 'small' },
					},
				],
				data: [
					{
						title: 'GitHub repo',
						value: 'https://github.com/kauderk/sanity-svelte-kit',
						category: 'Code',
					},
					{ title: 'Frontend', value: '', category: 'apps' },
				],
			},
		},
		{
			name: 'document-list',
			options: {
				title: 'Recent Posts',
				order: '_createdAt desc',
				types: ['post'],
			},
			layout: { height: 'auto' },
		},
		{ name: 'project-users', layout: { width: 'medium' } },
	],
}

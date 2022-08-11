export function formatYieldsPageData(poolsAndConfig: any) {
	let _pools = poolsAndConfig[0]?.data ?? []
	let _config = poolsAndConfig[1]?.protocols ?? []
	let _urls = poolsAndConfig[2] ?? []
	let _chains = poolsAndConfig[3] ?? []

	// add projectName and audit fields from config to pools array
	_pools = _pools.map((p) => ({
		...p,
		projectName: _config[p.project]?.name,
		audits: _config[p.project]?.audits,
		airdrop: _config[p.project]?.symbol === null || _config[p.project]?.symbol === '-',
		category: _config[p.project]?.category,
		url: _urls[p.project] ?? ''
	}))

	const poolsList = []

	const chainList: Set<string> = new Set()

	const projectList: { name: string; slug: string }[] = []

	_pools.forEach((pool) => {
		// remove potential undefined on projectName
		if (pool.projectName) {
			poolsList.push(pool)
			chainList.add(pool.chain)

			if (!projectList.find((p) => p.name === pool.projectName)) {
				projectList.push({ name: pool.projectName, slug: pool.project })
			}
		}
	})

	let tokenNameMapping = {}
	for (const key of Object.keys(_config)) {
		tokenNameMapping[_config[key].symbol] = _config[key].name
	}
	// add chain symbols too
	for (const chain of _chains) {
		tokenNameMapping[chain.tokenSymbol] = chain.name
	}
	// remove any null keys (where no token)
	tokenNameMapping = Object.fromEntries(Object.entries(tokenNameMapping).filter(([k, _]) => k !== 'null'))

	return {
		pools: poolsList,
		chainList: Array.from(chainList),
		projectList,
		tokenNameMapping
	}
}

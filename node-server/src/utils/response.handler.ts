export function sucessfulResponse(data: any, count: number = null) {
	return count ? { status: 'success', count, data } : { status: 'success', data };
}

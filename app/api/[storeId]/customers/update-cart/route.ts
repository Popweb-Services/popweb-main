export async function PATCH(
  request: Request,
  { params }: { params: { storeId: string; phoneNumber: string } }
) {
  try {
    const body = request.json()
    
  } catch (error) {
    console.log("[UPDATE_CART]_PATCH", error)
  }
}

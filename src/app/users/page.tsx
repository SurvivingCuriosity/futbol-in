import connectDb from "@/shared/lib/db"
import User from "@/shared/models/User.model"

export default async function Users() {

    await connectDb()
    const users = await User.find({}).lean()

  return (
    <>
        <p>Soy un server component</p>
        <pre>{JSON.stringify(users, null, 2)}</pre>
    </>
  )
}
import { openDb } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET() {
  const db = await openDb();
  const items = await db.all("SELECT * FROM FoodStorageView");
  return NextResponse.json(items);
}

export async function POST(request: Request) {
  const db = await openDb();
  const allItems = await request.json();
  await db.run("BEGIN TRANSACTION");
  await db.run("DELETE FROM FoodStorage");
  for (const item of allItems) {
    await db.run(
      "INSERT INTO FoodStorage (food, expiration, quantity, food_type, use_date) VALUES (?, ?, ?, ?, ?)",
      [item.food, item.expiration, item.quantity, item.food_type, item.use_date]
    );
  }
  await db.run("COMMIT");
  return NextResponse.json({ message: "Items updated successfully" });
}
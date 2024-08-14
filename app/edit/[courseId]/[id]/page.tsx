"use client"
import { useParams } from 'next/navigation'
import React from 'react'

type Props = {}

export default function page({}: Props) {
const param = useParams<{courseId: string, topicId:string}>()
console.log(param)
  return (
    <div></div>
  )
}
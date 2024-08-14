import filename from '@/filename'
import Link from 'next/link'
import React from 'react'

type Props = {}

export default function page({}: Props) {
  return (
    <div><Link href="/courses.json" className="dropbox-saver" data-filename={filename()} /></div>
  )
}
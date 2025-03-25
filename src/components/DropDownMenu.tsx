'use client'

import { LogOut, Settings, User } from 'lucide-react'

import { SignOutButton } from '@clerk/nextjs'

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import Link from 'next/link'

import { UserStore, useUserStore } from '@/app/store/user'

export function DropDownMenu() {
    const { getUserData, avatar, pseudo } = useUserStore() as UserStore

    if (!avatar) getUserData()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar>
                    <AvatarImage src={avatar} alt="IM" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <Link
                        className="cursor-pointer"
                        href={`/profile/${pseudo}`}
                    >
                        <DropdownMenuItem>
                            <User />
                            Profile
                        </DropdownMenuItem>
                    </Link>

                    <Link href="/settings">
                        <DropdownMenuItem>
                            <Settings />
                            Settings
                        </DropdownMenuItem>
                    </Link>

                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut />
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

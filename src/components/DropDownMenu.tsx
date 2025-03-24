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

export function DropDownMenu() {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <Avatar>
                    <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuGroup>
                    <DropdownMenuItem>
                        <User />
                        <Link href="/profile">Profile</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem>
                        <Settings /> <Link href="/settings">Settings</Link>
                    </DropdownMenuItem>

                    <DropdownMenuItem className="cursor-pointer">
                        <LogOut />
                        <SignOutButton />
                    </DropdownMenuItem>
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

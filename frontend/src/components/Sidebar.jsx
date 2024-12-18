import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from '../store/store';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { codeSmellTypes } from '@/utils/constants';

export function AppSidebar() {
  const { detectCodeSmells, setSelectedSmells, loading } = useStore();
  const [directory, setDirectory] = useState('');
  const [selectedSmellNames, setSelectedSmellNames] = useState([]);

  const toggleCodeSmell = (dataKey) => {
    setSelectedSmellNames((prev) =>
      prev.includes(dataKey)
        ? prev.filter((key) => key !== dataKey)
        : [...prev, dataKey]
    );
  };

  const handleSelectAll = (selectAll) => {
    setSelectedSmellNames(selectAll ? codeSmellTypes.map((item) => item.dataKey) : []);
  };

  const handleDetect = async () => {
    await detectCodeSmells(directory, selectedSmellNames);
    const selected = codeSmellTypes.filter((item) => selectedSmellNames.includes(item.dataKey));
    setSelectedSmells(selected);
  };

  const allSelected = selectedSmellNames?.length === codeSmellTypes?.length;
  const disabled = !directory || !selectedSmellNames?.length || loading

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Card className='-mx-[8px] border-none rounded-none'>
            <CardHeader>
              <CardTitle className="text-lg -mb-2">Enter directory path to your project</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center gap-4">
                <Input
                  type="text"
                  value={directory}
                  onChange={(e) => setDirectory(e.target.value)}
                  placeholder="Please enter a path"
                  className="w-full max-w-md"
                />
              </div>
              <CardHeader className="text-start flex flex-row justify-between items-center -mx-4">
                <CardTitle className="-ml-2 text-lg">Select code smells</CardTitle>
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={() => handleSelectAll(!allSelected)}
                />
              </CardHeader>
              <SidebarMenu>
                {codeSmellTypes.map((item, i) => (
                  <SidebarMenuItem key={item.dataKey} className='mt-[1px]'>
                    <SidebarMenuButton asChild>
                      <div className='flex justify-between'>
                        <span>{item.type}</span>
                        <Checkbox
                          checked={selectedSmellNames.includes(item.dataKey)}
                          onCheckedChange={() => toggleCodeSmell(item.dataKey)}
                        />
                      </div>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Button
                onClick={!disabled ? handleDetect : undefined}
                disabled={disabled}
                className="w-full max-w-md mt-6 -mb-4"
              >
                {loading ? 'Processing...' : 'Detect'}
              </Button>
            </CardContent>
          </Card>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}

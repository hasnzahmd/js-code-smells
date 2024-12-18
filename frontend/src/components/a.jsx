import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useStore from '../store/store';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { codeSmellTypes } from '@/utils/constants';

export function AppSidebar() {
  const { detectCodeSmells } = useStore();
  const [directory, setDirectory] = useState('');
  const [selectedSmells, setSelectedSmells] = useState([]);

  const toggleCodeSmell = (dataKey) => {
    setSelectedSmells((prev) =>
      prev.includes(dataKey)
        ? prev.filter((key) => key !== dataKey)
        : [...prev, dataKey]
    );
  };

  const handleDetect = () => {
    detectCodeSmells(directory, selectedSmells);
  };

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <Card className="-mx-[8px] border-none rounded-none">
            <CardHeader>
              <CardTitle className="text-lg -mb-2">
                Enter directory path to your project
              </CardTitle>
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
              <CardHeader className="text-start -ml-6">
                <CardTitle className="text-lg -mb-2">Select code smells</CardTitle>
              </CardHeader>
              <SidebarMenu>
                {codeSmellTypes.map(({ type, dataKey }) => (
                  <SidebarMenuItem key={dataKey} className="flex justify-between items-center">
                    <span>{type}</span>
                    <Checkbox
                      checked={selectedSmells.includes(dataKey)}
                      onCheckedChange={() => toggleCodeSmell(dataKey)}
                    />
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
              <Button
                onClick={directory ? handleDetect : undefined}
                disabled={!directory || selectedSmells.length === 0}
                className="w-full max-w-md mt-8"
              >
                Detect
              </Button>
            </CardContent>
          </Card>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}

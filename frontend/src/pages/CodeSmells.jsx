import React, { useState, useEffect } from 'react';
import useStore from '../store/store';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"  

const CodeSmells = () => {
    const { codeSmells, selectedSmells, loading, error } = useStore();
    const [hasCodeSmells, setHasCodeSmells] = useState(false);
    const [sortedCodeSmells, setSortedCodeSmells] = useState([]);

    useEffect(() => {
        if (codeSmells && Object.keys(codeSmells).length > 0 && selectedSmells.length > 0) {
            setHasCodeSmells(true);
            setSortedCodeSmells([...selectedSmells].sort((a, b) => codeSmells[b.dataKey].length - codeSmells[a.dataKey].length));
        } else {
            setHasCodeSmells(false);
        }
    }, [codeSmells, selectedSmells]);

    return (
        <div>
            <Card className='border-0 border-b rounded-none fixed w-[69.9rem]'>
                <CardHeader>
                    <CardTitle className="text-center border-none">Detect Javascript Code Smells</CardTitle>
                </CardHeader>
            </Card>
            <div className="w-[69.9rem] p-4 no-scrollbar pt-[5.5rem]">
                <div className="gap-4 grid grid-cols-1">
                    {loading ? (
                        <SkeletonCardList count={3} />
                    ) : hasCodeSmells ? (
                        <>
                            {sortedCodeSmells.map(({ type, dataKey, columns, description }) => (
                                <Accordion type="single" collapsible className="w-full">
                                    <AccordionItem value="item-1">
                                        <Card key={type}>
                                            <AccordionTrigger className='hover:no-underline '>
                                                <CardHeader className='w-full'>
                                                    <CardTitle className="flex flex-col gap-2 items-start w-full">
                                                        <div className="flex justify-between w-full">
                                                            <p>{type}</p>
                                                            <span
                                                                className={`font-medium text-lg ${codeSmells[dataKey] && codeSmells[dataKey].length === 0 ? 'text-blue-500' : 'text-red-500'}`}
                                                            >
                                                                {codeSmells[dataKey] && codeSmells[dataKey].length} detected
                                                            </span>
                                                        </div>
                                                        <p className="font-normal text-base text-gray-500">{description}.</p>
                                                    </CardTitle>
                                                </CardHeader>
                                            </AccordionTrigger>
                                            <AccordionContent>
                                                <ScrollArea maxHeight="max-h-96">
                                                    <CardContent>
                                                        {(codeSmells[dataKey] && codeSmells[dataKey].length > 0) && renderTable(codeSmells[dataKey], columns)}
                                                    </CardContent>
                                                    <ScrollBar orientation="horizontal" />
                                                </ScrollArea>
                                            </AccordionContent>
                                        </Card>
                                    </AccordionItem>
                                </Accordion>
                            ))}
                        </>
                    ) : 
                        <div className='mt-60'>
                            <CardHeader>
                                <CardTitle className="text-center text-lg border-none text-red-500">{error}</CardTitle>
                            </CardHeader>
                        </div>
                    }
                </div>
            </div>
        </div>
    );
};

export default CodeSmells;

const renderTable = (data, columns) => (
    <Table>
        <TableHeader>
            <TableRow className="bg-gray-50 rounded-md">
                <TableHead className="text-left">#</TableHead>
                {columns?.map((col) => (
                    <TableHead key={col} className={`${col === 'File' ? 'text-left' : 'text-center'}`}>{col}</TableHead>
                ))}
            </TableRow>
        </TableHeader>
        <TableBody className={`relative ${data?.length === 0 && 'h-60'}`}>
            {data?.map((row, idx) => (
                <TableRow key={idx}>
                    <TableCell className="text-left">{idx + 1}</TableCell>
                    {columns.map((col) => (
                        <TableCell
                            key={col}
                            className={col === 'File' ? 'text-left' : 'text-center'}
                        >
                            {row[col.charAt(0).toLowerCase() + col.split(' ').join('').slice(1)]}
                        </TableCell>
                    ))}
                </TableRow>
            ))}
        </TableBody>
    </Table>
);

const SkeletonCardList = ({ count }) => {
    return (
        <div className="gap-10 mt-10 grid grid-cols-1">
            {Array.from({ length: count }).map((_, idx) => (
                <SkeletonCard key={idx} />
            ))}
        </div>
    );
};

const SkeletonCard = () => (
    <Card className="space-y-4 p-4 border-none">
        <div className='flex justify-between'>
            <Skeleton className="h-6 w-1/2" />
            <Skeleton className="h-4 w-[10%]" />
        </div>
        <div className='flex flex-col gap-4'>
            <div className="flex justify-between">
                {Array.from({ length: 4 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-4 w-[5%]" />
                ))}
            </div>
            <div className="space-y-2 flex flex-col justify-center">
                {Array.from({ length: 3 }).map((_, idx) => (
                    <Skeleton key={idx} className="h-4 w-[90%]" />
                ))}
            </div>
        </div>
    </Card>
);

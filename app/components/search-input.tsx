'use client';

import React, { useCallback } from 'react';
import AsyncSelect from 'react-select/async';
import { searchPerson } from '@/app/actions/actions';

export default function SearchInput() {
    const loadOptions = async (inputValue: string) => {
        const persons = await searchPerson(inputValue);
        return persons.map(person => ({
            value: person.id,
            label: person.name,
        }));
    };

    const handleChange = useCallback((option: { value: string } | null) => {
        const userId = option?.value || null;

        // Update the URL to reflect the selected person ID
        const url = new URL(window.location.href);
        if (userId) {
            url.searchParams.set('userId', userId);
        } else {
            url.searchParams.delete('userId');
        }
        window.history.pushState({}, '', url.toString());
        window.location.reload(); // Ensure server re-render
    }, []);

    return (

        <div
            suppressHydrationWarning
            className="w-full max-w-md mx-auto"
        >
            <AsyncSelect
                instanceId="person-search"
                cacheOptions={false}
                loadOptions={loadOptions}
                onChange={handleChange}
                placeholder="Search for a person..."
            />
        </div>

    );
}

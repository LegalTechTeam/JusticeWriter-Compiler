/**
 * @jest-environment jsdom
 */
 
import React from 'react'; 
import { render, fireEvent, screen, configure } from '@testing-library/react';
import Demographics from './Components/Demographics';
import ACEp1 from './Components/ACEp1';
import ACEp2 from './Components/ACEp2';
import Community from './Components/Community';
import Evidence from './Components/Evidence';
import FamilyDynamics from './Components/FamilyDynamics';
import MentalHealth from './Components/MentalHealth';
import Schooling from './Components/Schooling';
import PeersRoleModels from './Components/PeersRoleModels';

  jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useNavigate: jest.fn(),
  }));

  describe('Demographics', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<Demographics />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/familyDynamics');
    });
  });


  describe('Family Dynamics', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<FamilyDynamics />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/community');
    });
  });


  describe('Community', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<Community />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/schooling');
    });
  });

  describe('Schooling', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<Schooling />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/aceOne');
    });
  });


  describe('ACE1', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<ACEp1 />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/aceTwo');
    });
  });

  describe('ACE2', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<ACEp2 />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/peers-role-models');
    });
  });

  describe('PeersRoleModels', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<PeersRoleModels />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/mental-health');
    });
  });

  describe('MentalHealth', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<MentalHealth />);
    fireEvent.click(screen.getByText('Next'));
    expect(mockNavigate).toHaveBeenCalledWith('/evidence');
    });
  });

  describe('Evidence', () => {
    test('should navigate when button is clicked', () => {
    const mockNavigate = jest.fn();
    require('react-router-dom').useNavigate.mockReturnValue(mockNavigate);
    render(<Evidence />);
    fireEvent.click(screen.getByText('Save'));
    expect(mockNavigate).toHaveBeenCalledWith('/submit');
    });
  });
